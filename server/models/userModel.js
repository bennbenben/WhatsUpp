const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"]
    },
    username: {
        type: String,
        required: [true, "Please enter username"],
        minLength: [6, "Username must be minimum 6 characters"],
        unique: [true, "Username already exists"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "Password must be minimum 6 characters"]
    },
    avatar: {
        type: String
    },
    bio: {
        type: String,
        default: "Hello, welcome to my profile! 👋"
    }
}, {
    collection: "whats_upp"
});

module.exports = mongoose.model("User", userSchema);