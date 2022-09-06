const chatroomModel = require("../models/chatroomModel");
const ErrorResponse = require("../utils/ErrorResponse");

// Display all open chat rooms in SidebarChat
exports.listChatroom = async (req, res, next) => {
  const { userId, username } = req.body;
  let chatrooms = [];

  try {
    chatrooms = await chatroomModel.find({
      $or: [
        { "participants": { "$elemMatch": { "userId": userId } } },
        { "participants": { "$elemMatch": { "username": username } } },
      ],
    });

    return res.json(chatrooms);
  } catch (error) {
    return next(new ErrorResponse("Failed to show chatrooms", 500));
  };
};

// Create a chatroom
exports.createChatroom = {};

// Open a chatroom and show the chats
exports.showChatroom = {};

// Lists the messages in a chat
exports.listMessage = {};

// Creates a message
exports.createMessage = {};
