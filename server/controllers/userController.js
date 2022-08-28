const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  console.log(req.body);

  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    await userModel.create({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: hash,
    });

    res.status(200).json({ status: "ok" });
  } catch (err) {
    res.json({
      status: "error",
      error: "username or email already exists",
    });
  }
};

// exports.loginUser = async (req, res, next) => {
//     const {userId, password } = req.body;

//     const user = await userModel.findOne({
//         $or: [{ email: userId }, {username: userId}]
//     }).select("+password");

//     if (!user) {
//         // do something
//     }

// };
