const Product = require("../models/product");

exports.postAddProduct = (request, response, next) => {
  const { title, image, description, price } = request.body;
  const product = new Product(title, image, description, price);
  product
    .save()
    .then((result) => {
      console.log("product created successfully");
      response.redirect("/admin/admin-products");
    })
    .catch((err) => console.log(err));
};

exports.getAddProducts = (request, response, next) => {
  response.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/admin-product",
  });
};
// exports.getEditProducts = (request, response, next) => {
//   const editMode = request.query.edit;
//   if (!editMode) {
//     return response.redirect("/");
//   }
//   const productId = request.params.productId;
//   request.user
//     .getProducts({ where: { id: productId } })
//     .then((products) => {
//       const product = products[0];
//       response.render("admin/edit-product", {
//         docTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("admin/products", {
        products,
        docTitle: "Admin Products",
        path: "/admin/admin-products",
      });
    })
    .catch((err) => console.log(err));
};
// exports.postEditProduct = (request, response, next) => {
//   const productId = request.body.productId;
//   const updateTitle = request.body.title;
//   const updatedImage = request.body.image;
//   const updatePrice = request.body.price;
//   const updateDescription = request.body.description;
//   Product.findByPk(productId)
//     .then((product) => {
//       product.title = updateTitle;
//       product.image = updatedImage;
//       product.price = updatePrice;
//       product.description = updateDescription;
//       return product.save();
//     })
//     .then((result) => {
//       console.log("Updated Product");
//       response.redirect("/admin/admin-products");
//     })
//     .catch((err) => console.log(err));
// };
// exports.deleteProduct = (request, response, next) => {
//   const productId = request.body.productId;
//   Product.findByPk(productId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log("delete successfully");
//       response.redirect("/admin/admin-products");
//     })
//     .catch((err) => console.log(err));
// };
