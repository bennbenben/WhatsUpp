const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

// Register a user
exports.registerUser = async (req, res, next) => {
  console.log(req.body);

  try {
    const userDTO = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    sendToken(userDTO, 201, res);
    // res.status(201).json({
    //   success: true,
    //   token: "helloworld",
    // });
  } catch (error) {
    next(error);
  }
};

// Login a user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // verification if email or password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // check if user exist in DB
  try {
    const userDTO = await userModel.findOne({ email }).select("+password");

    // if email cannot query the record
    if (!userDTO) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    const isMatch = await userDTO.matchPasswords(password);

    // if cannot find a match based on password
    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(userDTO, 200, res);
    // res.status(200).json({
    //   success: true,
    //   token: "helloworld",
    // });
  } catch (error) {
    next(error);
  }
};

// Forget password - reset password
exports.forgetPassword = (req, res, next) => {
  const email = req.body.email;

  try {
    const userDTO = await userModel.findOne({email: email});

    if (!userDTO) {
      return next(new ErrorResponse("Email not found", 404));
    }

    ======================CONTINUE HERE==============================
    
  } catch (error) {
    
  }
}

// common functions 
const sendToken = (userDTO, statusCode, res) => {
  const token = userDTO.getSignedToken();
  res.status(statusCode).json({ success: true, token: token });
}