const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err};

    error.message = err.message;
    if (err.code === 11000) {
        const message = "Entered duplicate error field";
        error = new ErrorResponse(message, 400);
    }

    if (err.name === "Validation Error") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server error"
    });
}

module.exports = errorHandler;