const mongoose = require("mongoose");

const connectDB = () => {
 
    let connectionString = "";
    let profile = "";

    if (process.env.NODE_ENV == "production") {
        profile = "cloud";
        connectionString = process.env.MONGO_URI;
    } else {
        profile = "local";
        connectionString = process.env.MONGO_LOCAL_URI;
    }

    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongoose Connected on ${profile}`);
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = connectDB;