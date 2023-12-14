const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathRoot");
const Cart = require("./cart");
const products = [];
const p = path.join(rootDir, "data", "products.json");
const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

class Product {
  constructor(id, title, image, description, price) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.description = description;
    this.price = price;
  }
  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProduct = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatedProducts = [...products];
        if (existingProduct !== -1) {
          updatedProducts[existingProduct] = this;
          fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
            console.log(err);
          });
        }
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(cb) {
    getProductFromFile(cb);
  }
  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find((product) => product.id === id);
      const updatedProduct = products.filter((p) => p.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
}
module.exports = Product;
