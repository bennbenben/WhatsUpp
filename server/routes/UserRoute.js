// Import dependencies
const express = require("express");
const { loginUser, logoutUser } = require("../controllers/userController");

// Initialize app (or router)
const app = express();

// Routes
app.route("/login").post(loginUser);
