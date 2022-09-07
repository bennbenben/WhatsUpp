// Import dependencies
const express = require("express");
const {protect} = require("../middlewares/AuthHandler");
const chatController = require("../controllers/chatController1");

// Initialize app (or router)
const router = express.Router();

// Routes (router = /api/v1/chat)
router.route("/").get(protect, chatController.listChatroom); 
router.route("/").post(protect, chatController.createChatroom); 
// router.route("/:id").get(protect, chatController.showChatroom);
// router.route("/:id/message").get(protect, chatController.listMessage);
// router.route("/:id/message").post(protect, chatController.createMessage);

module.exports = router;