const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
  let token;

  // console.log("req is: ", req);
  // console.log("req.headers is: ", req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // Bearer <jsonwebtoken: long strings>
    token = req.headers.authorization.split(" ")[1];
  }

  // if there was no token inside the headers
  if (!token) {
    return next(new ErrorResponse("No token inside the headers. Not authorized to access this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // decrypt / verify based on the secret
    const userDTO = await userModel.findById(decoded.userId); // find the user

    // if no user was found => token is invalid
    if (!userDTO) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = userDTO; // for other routes to use the userDTO object
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
};
