const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      minLength: [6, "Username must be minimum 6 characters"],
      unique: [true, "Username already exists"],
    },

    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: [true, "Email already exists"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
      minLength: [6, "Password must be minimum 6 characters"],
      select: false,
    },

    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },

    avatar: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "Hello, welcome to my profile!",
    },
  },
  {
    collection: "users",
  }
);

// Mongoose middlewares for pre-saving
userSchema.pre("save", async function (next) {
  // checks if password field is modified - then it won't re-hash it, just save
  if (!this.isModified("password")) {
    next();
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Mongoose method - Login
userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Mongoose method - Sign jwt
userSchema.methods.getSignedToken = function () {
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      bio: this.bio,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY,
    }
  );
};

// Mongoose method - get reset password token
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); //+10mins into the future

  return resetToken;
};

const user = mongoose.model("User", userSchema);
module.exports = user;