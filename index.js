const path = require("path");

const express = require("express");
require("dotenv/config");
const app = express();
const { mongoConnect } = require("./utils/database");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", "views");
// app.use((request, response, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       request.user = user;

//       next();
//     })
//     .catch((err) => console.log(err));

// });
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use((request, response, next) => {
  response.status(404).render("page-not-found", { docTitle: "Page Not Found" });
});
const PORT = process.env.PORT || 8080;
mongoConnect(() => {
  app.listen(PORT, () => {
    console.log("server is running correctly");
  });
});
