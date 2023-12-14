const path = require("path");
const express = require("express");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", "views");
app.use("/admin", adminRoutes);
app.use("/", shopRoutes);

app.use((request, response, next) => {
  response.status(404).render("page-not-found", { docTitle: "Page Not Found" });
});
app.listen(3000, () => {
  console.log("server is running correctly");
});
