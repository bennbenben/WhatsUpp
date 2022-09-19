const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");
const sendEmail = require("../utils/SendEmail");
const crypto = require("crypto");

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

    // generating the JWT token, different from your common function
    // as need to add additional data to user payload
    // console.log('generating Jweb token upon login')
    // const userData = {
    //   email: userDTO.email,
    //   name: userDTO.name,
    //   bio: userDTO.bio,
    // }
    // const token = jwt.sign({
    //   exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
    //   data: userData,
    // }, process.env.JWT_SECRET)
    
    // return res.json({token})
    sendToken(userDTO, 200, res);
    // res.status(200).json({
    //   success: true,
    //   token: "helloworld",
    // });
  } catch (error) {
    next(error);
  }
};

// Forgot password - reset password
exports.forgotPassword = async (req, res, next) => {
  const email = req.body.email;

  try {
    const userDTO = await userModel.findOne({ email: email });

    if (!userDTO) {
      return next(new ErrorResponse("Email could not be found", 404));
    }

    // add a new field to this userDTO object, and return the resetToken
    const resetToken = userDTO.getResetPasswordToken();
    await userDTO.save();

    // send email
    let resetURL;
    if (process.env.NODE_ENV != "production" ) {
      resetURL = `http://localhost:3000/passwordreset/${resetToken}`;
    } else {
      resetURL = `https://whats-upp.herokuapp.com/passwordreset/${resetToken}`;
    };
    
    const emailMsg = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href="${resetURL}" clicktracking=off>${resetURL}</a>
    `;

    try {
      await sendEmail({
        to: userDTO.email,
        subject: "Password reset request",
        text: emailMsg,
      });

      res.status(200).json({
        success: true,
        description: "Email sent",
      });
    } catch (error) {
      userDTO.resetPasswordToken = undefined;
      userDTO.resetPasswordExpire = undefined;

      await userDTO.save();
      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const userDTO = await userModel.findOne({
      resetPasswordToken: resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!userDTO) {
      next(new ErrorResponse("Invalid reset token", 400));
    }

    userDTO.password = req.body.password;
    userDTO.resetPasswordToken = undefined;
    userDTO.resetPasswordExpire = undefined;

    await userDTO.save();
    return res.status(201).json({ success: true, data: "Password Reset Success" });
  } catch (error) {
    next(error);
  }
};

// common functions
const sendToken = (userDTO, statusCode, res) => {
  const token = userDTO.getSignedToken();
  res.status(statusCode).json({ success: true, token: token });
};
