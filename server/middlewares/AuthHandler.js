const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer <jsonwebtoken: long strings>
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userDTO = await userModel.findById(decoded.id);

    if (!userDTO) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = userDTO;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
