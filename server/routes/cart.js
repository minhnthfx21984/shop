const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const cartController = require("../controllers/cart");

router.post("/carts/add", checkAuth, cartController.addToCart);

router.get("/carts", checkAuth, cartController.getCarts);

router.put("/carts/update", checkAuth, cartController.addToCart);

router.delete("/carts/delete", checkAuth, cartController.deleteCart);

module.exports = router;
