const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getIndex = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/shop", { products, docTitle: "Shop", path: "/" });
  });
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll((products) => {
    response.render("shop/product-list", {
      products,
      docTitle: "Shop",
      path: "/products",
    });
  });
};
exports.getProductById = (request, response, next) => {
  const productId = request.params.productId;
  Product.findById(productId, (product) => {
    response.render("shop/product-detail", {
      product,
      docTitle: product.title,
      path: "/products",
    });
  });
};
exports.getOrders = (request, response, next) => {
  response.render("shop/orders", {
    path: "/orders",
    docTitle: "Your orders",
  });
};
exports.getCart = (request, response, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      let cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      response.render("shop/cart", {
        products: cartProducts,
        path: "/cart",
        docTitle: "Carts",
      });
    });
  });
};
exports.addCart = (request, response, next) => {
  const productId = request.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  response.redirect("/cart");
};
exports.getCheckout = (request, response, next) => {
  response.render("shop/checkout", {
    path: "/checkout",
    docTitle: "Checkouts",
  });
};
exports.postCartDeleteProduct = (request, response, next) => {
  const productId = request.body.productId;
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);
    response.redirect("/cart");
  });
};
