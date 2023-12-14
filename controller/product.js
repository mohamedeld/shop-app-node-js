const Product = require("../models/product");
// const Cart = require("../models/cart");
exports.getIndex = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("shop/shop", {
        products,
        docTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (request, response, next) => {
  Product.fetchAll()
    .then((products) => {
      response.render("shop/product-list", {
        products,
        docTitle: "Shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};
exports.getProductById = (request, response, next) => {
  const productId = request.params.productId;
  Product.fetchById(productId).then((product) => {
    response.render("shop/product-detail", {
      product,
      docTitle: product.title,
      path: "/products",
    });
  });
};
// exports.getOrders = (request, response, next) => {
//   request.user
//     .getOrders({ include: ["products"] })
//     .then((orders) => {
//       response.render("shop/orders", {
//         path: "/orders",
//         docTitle: "Your orders",
//         orders,
//       });
//     })
//     .catch((err) => console.log(err));
// };
// exports.getCart = (request, response, next) => {
//   request.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts()
//         .then((products) => {
//           response.render("shop/cart", {
//             products: products,
//             path: "/cart",
//             docTitle: "Carts",
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));
// };
// exports.addCart = (request, response, next) => {
//   const productId = request.body.productId;
//   let fetchCart;
//   let newQuantity = 1;
//   request.user
//     .getCart()
//     .then((cart) => {
//       fetchCart = cart;
//       return cart.getProducts({ where: { id: productId } });
//     })
//     .then((products) => {
//       let product;
//       if (products.length > 0) {
//         product = products[0];
//       }

//       if (product) {
//         const oldQuantity = product.cart_item.quantity;
//         newQuantity = oldQuantity + 1;
//         return product;
//       }
//       return Product.findByPk(productId);
//     })
//     .then((product) => {
//       return fetchCart.addProduct(product, {
//         through: { quantity: newQuantity },
//       });
//     })
//     .catch((err) => console.log(err))

//     .then(() => response.redirect("/cart"))
//     .catch((err) => console.log(err));
// };
// exports.getCheckout = (request, response, next) => {
//   response.render("shop/checkout", {
//     path: "/checkout",
//     docTitle: "Checkouts",
//   });
// };
// exports.postCartDeleteProduct = (request, response, next) => {
//   const productId = request.body.productId;
//   request.user
//     .getCart()
//     .then((cart) => {
//       return cart
//         .getProducts({ where: { id: productId } })
//         .then((products) => {
//           const product = products[0];
//           return product.cart_item.destroy();
//         })
//         .then((result) => {
//           console.log("deleted successfully");
//           response.redirect("/cart");
//         });
//     })
//     .catch((err) => console.log(err));
// };

// exports.createOrder = (request, response, next) => {
//   let fetchCart;
//   request.user
//     .getCart()
//     .then((cart) => {
//       fetchCart = cart;
//       return cart
//         .getProducts()
//         .then((products) => {
//           return request.user.createOrder().then((order) => {
//             return order.addProducts(
//               products.map((product) => {
//                 product.orderItem = { quantity: product.cart_item.quantity };
//                 return product;
//               })
//             );
//           });
//         })
//         .catch((err) => console.log(err));
//     })
//     .then((result) => {
//       return fetchCart.setProducts(null);
//     })
//     .then((result) => {
//       response.redirect("/orders");
//     })
//     .catch((err) => console.log(err));
// };
