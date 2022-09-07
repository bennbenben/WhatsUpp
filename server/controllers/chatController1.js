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

    if (!chatrooms) {
      next(new ErrorResponse("No active chatrooms found", 404));
    }

    return res.status(200).json({ success: true, chatrooms: chatrooms });

  } catch (error) {
    return next(new ErrorResponse("Failed to show chatrooms", 500));
  };
};

// Create a chatroom
exports.createChatroom = async (req, res, next) => {
  console.log(req.body);
  
  try {
    const chatroomDTO = chatroomModel.create({
      chatroom_name: req.body.chatroom_name,
      participants: req.body.participants,
    });

    res.status(201).json({ success: true, chatroomId: chatroomDTO._id });

  } catch (error) {
    return next(error);
  };
};

// Open a chatroom and show the chats
// exports.showChatroom = {};

// Lists the messages in a chat
// exports.listMessage = {};

// Creates a message
// exports.createMessage = {};
