const path = require("path");
const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin");
router.route("/add-product").post(adminController.postAddProduct);

router.route("/add-product").get(adminController.getAddProducts);
router.route("/edit-product/:productId").get(adminController.getEditProducts);
router.route("/admin-products").get(adminController.getProducts);
router.route("/edit-product").post(adminController.postEditProduct);
router.route("/delete-product").post(adminController.deleteProduct);
module.exports = router;
