const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathRoot");
const p = path.join(rootDir, "data", "carts.json");

class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let existingProductIndex = cart.products.find((prod) => prod.id === id);
      let existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const updateCart = { ...cart };
      const product = updateCart.products.find((prod) => prod.id === id);
      if (!product) {
        return;
      }
      const productQuantity = product.quantity;
      updateCart.products = updateCart.products.filter(
        (prod) => prod.id !== id
      );
      updateCart.totalPrice =
        updateCart.totalPrice - productPrice * productQuantity;
      fs.writeFile(p, JSON.stringify(updateCart), (err) => console.log(err));
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cb(JSON.parse(fileContent));
      } else {
        cb(null);
      }
    });
  }
}

module.exports = Cart;
