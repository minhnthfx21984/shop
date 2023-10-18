const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

const emailController = require("../controllers/email");

router.post("/email", checkAuth, emailController.sendEmail);

module.exports = router;
