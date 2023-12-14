const Product = require("../models/product");

exports.postAddProduct = (request, response, next) => {
  const { title, image, description, price } = request.body;
  const product = new Product(null, title, image, description, price);
  product.save();
  response.redirect("/");
};

exports.getAddProducts = (request, response, next) => {
  response.render("admin/edit-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
  });
};
exports.getEditProducts = (request, response, next) => {
  const editMode = request.query.edit;
  if (!editMode) {
    return response.redirect("/");
  }
  const productId = request.params.productId;
  Product.findById(productId, (product) => {
    response.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
    });
  });
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("admin/products", {
      products,
      docTitle: "Admin Products",
      path: "/admin/admin-products",
    });
  });
};
exports.postEditProduct = (request, response, next) => {
  const productId = request.body.productId;
  const updateTitle = request.body.title;
  const updatedImage = request.body.image;
  const updatePrice = request.body.price;
  const updateDescription = request.body.description;
  const updateProduct = new Product(
    productId,
    updateTitle,
    updatedImage,
    updateDescription,
    updatePrice
  );
  updateProduct.save();
  response.redirect("/admin/admin-products");
};
exports.deleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.deleteById(productId);
  response.redirect("/admin/admin-products");
};
