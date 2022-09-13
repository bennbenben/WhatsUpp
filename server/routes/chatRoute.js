// Import dependencies
const express = require("express");
const { protect } = require("../middlewares/AuthHandler");
const chatController = require("../controllers/chatController");

// Initialize app (or router)
const router = express.Router();

// Routes (router = /api/v1/chat)
router.route("/listchatroom").post(protect, chatController.listChatroom); 
router.route("/").post(protect, chatController.createChatroom);
router.route("/listUsers").get(protect, chatController.listUsers); 
router.route("/:chatroomId").get(protect, chatController.showChatroom);
router.route("/:chatroomId/message").get(protect, chatController.listMessage);
router.route("/:chatroomId/message").post(protect, chatController.createMessage);

module.exports = router;