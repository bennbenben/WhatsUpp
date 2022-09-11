// Import dependencies
const express = require("express");
const path = require("path");
const errorHandler = require("./middlewares/ErrorHandler");

// Configs
const app = express();
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/public", express.static("public"));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({
    path: "server/config/config.env",
  });
  const cors = require("cors");
  app.use(cors());
}

// import routes
const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
// const private = require("./routes/privateRoute");

app.use("/api/v1", user);
app.use("/api/v1/chat", chat);
// app.use("/api/v1/private", private);

// Middleware
app.use(errorHandler);

// Deployment
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get('/', (req, res) => {
    res.send("Server is listening ..");
  });
}

module.exports = app;
