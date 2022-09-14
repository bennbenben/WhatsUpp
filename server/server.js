const app = require("./app");
const connectDB = require("./config/database");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
// const socket = require("socket.io").listen(port).sockets;

connectDB();

app.get("/hello-world/test-api", (req, res) => {
  res.send("hello world");
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// sockets
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

io.of("/api/socket").on("connection", (socket) => {
  console.log("socket.io: user connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// mongoDB changestream
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connected for changestream");

  console.log("Setting changestreams");
  const messageChangeStream = connection.collection("messages").watch();

  messageChangeStream.on("change", (change) => {
    console.log("changestream registered a change: ", change);
    switch (change.operationType) {
      case "insert":
        // emit an event to the FE (pass in the change variable)
        console.log("### inside messageChangeStream: insert case");
        const messageObject = {
          chatId: change.fullDocument.chatId,
          name: change.fullDocument.name,
          message: change.fullDocument.message,
          timestamp: change.fullDocument.timestamp,
          _id: change.fullDocument._id,
        };
        io.of("/api/socket").emit("newMessage", messageObject);
        break;
    }
  });
});
