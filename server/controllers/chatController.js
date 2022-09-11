const chatroomModel = require("../models/chatroomModel");
const messagesModel = require("../models/messagesModel");
const ErrorResponse = require("../utils/ErrorResponse");

// Display all open chat rooms in SidebarChat
exports.listChatroom = async (req, res, next) => {
  // const { userId, username } = req.body;
  const { userId, username } = req.body;
  console.log('req.data',req.body)
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
exports.showChatroom = async (req, res, next) => {
  console.log("inside showChatroom");
  let chatroom = {
    // _id: ...
    // chatroom_name: ....
    // participants: [{userId, username}]
  };

  try {
    console.log(`these are the req.params: ${req.params}`);
    const chatroomId = req.params.chatroomId;
    chatroom = await chatroomModel.findById(chatroomId);
    
  } catch (error) {
    return next(new ErrorResponse("Failed to fetch chatroom data", 500));
  }

  return res.status(200).json({ success: true, chatroom: chatroom });
};

// Lists the messages in a chat
exports.listMessage = async (req, res, next) => {
  console.log("inside listMessage");
  let messages = []
        
  try {
    console.log(`these are the req.params: ${JSON.stringify(req.params.chatroomId)}`);
    messages = await messagesModel.find({ chatId : req.params.chatroomId }).exec();
//       // need to sort messages here by timestamp
//       // and also install luxon to post currentTimenNow
  } catch (err) {
    return next(new ErrorResponse("Failed to fetch list messages", 500));
  }

  return res.status(200).json({ success: true, messages: messages });
};

// Creates a message
exports.createMessage = async (req, res, next) => {
  console.log("inside createMessage");
  const message = req.body;

  try {
    await messagesModel.create(message);
  } catch (error) {
    return next(new ErrorResponse("Failed to send message", 500));
  };

  return res.status(201).json({ success: true, message: message });
}
