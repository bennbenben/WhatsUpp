// Import dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");

// Configs
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static("public"));

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({
    path: "server/config/config.env",
  });
  app.use(cors());
}

// import routes
const user = require("./routes/userRoute");

app.use("/api/v1", user);

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
