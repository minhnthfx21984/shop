const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const checkoutController = require("../controllers/checkout");

router.get("/histories", checkAuth, checkoutController.getOrders);
router.get("/histories/all", checkAuth, checkoutController.getAllOrders);
router.get("/histories/:id", checkAuth, checkoutController.getOrder);

module.exports = router;
