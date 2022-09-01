// Import dependencies
const express = require("express");
const userController = require("../controllers/userController");

// Initialize app (or router)
const app = express();

// Routes
app.route("/register").post(userController.registerUser);
app.route("/login").post(userController.loginUser);
app.route("/forgotpassword").post(userController.forgotPassword);
app.route("/resetpassword/:resetToken").post(userController.resetPassword);

module.exports = app;