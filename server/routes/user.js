const express = require("express");
const router = express.Router();
const checkDuplicateEmail = require("../middleware/checkDuplicateEmail");

const userController = require("../controllers/user");

const { query } = require("express-validator");

// POST => "/users/signup"
router.post("/users/signup", checkDuplicateEmail, userController.createUser);
router.post("/users/login", userController.loginUser);
router.get("/users", userController.getUsers);

module.exports = router;
