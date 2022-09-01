const mongoose = require("mongoose");

const connectDB = () => {
  let connectionString = "";
  let profile = "";

  if (process.env.NODE_ENV == "production") {
    profile = "cloud";
    connectionString = process.env.MONGO_URI;
  } else {
    profile = "local";
    connectionString =
      "mongodb+srv://bobbest:wangweijie@generalassembly.imxw3.mongodb.net/?retryWrites=true&w=majority";
    // to change back if wana do dev on local
    // connectionString = process.env.MONGO_LOCAL_URI;
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
