const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.get("/products", productController.getProducts);

router.get("/products/pagination", productController.getPaginationProducts);

router.get("/products/:id", productController.getProduct);

module.exports = router;
