const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    sender: {
      userId: {
        type: String,
        required: [true, "Please include sender's userId"],
      },
      username: {
        type: String,
        required: [true, "Please include sender's username"],
      },
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "messages",
  }
);

const Messages = mongoose.model("messages", messageSchema);

module.exports = Messages;
