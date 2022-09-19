const mongoose = require("mongoose");

const connectDB = () => {
  let connectionString = "";
  let profile = "";

  if (process.env.NODE_ENV == "production") {
    profile = "cloud";
    connectionString = process.env.MONGO_URI;
  } else {
    profile = "local";
    // to change back if wana do dev on local
    connectionString = process.env.MONGO_LOCAL_URI || process.env.MONGO_URI2;
  }
  console.log("Mongoose connect successfully");
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "whats_upp",
    })
    .then(() => {
      console.log(`Mongoose Connected on ${profile}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;