// Import dependencies
const express = require("express");
const { protect } = require("../middlewares/AuthHandler");
const { getPrivateRoute } = require("../controllers/privateController");

// Initialize app (or router)
const router = express.Router();

// Routes
router.route("/").get(protect, getPrivateRoute);

module.exports = router;
