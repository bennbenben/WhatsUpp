const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    chatroom_name: {
      type: String,
      required: [true, "Please enter chatroom name"],
    },

    participants: [
      {
        userId: {
          type: String,
          required: [true, "Please include participant's userId"],
        },
        username: {
          type: String,
          required: [true, "Please include participant's username"],
        },
      },
    ],

    avatar: { type: String },
  },
  {
    collection: "chatrooms",
  }
);

const chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = chatroom;