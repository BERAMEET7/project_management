const mongoose = require("mongoose");

const errorHandler = (err,req,res,next)=>{
    let statusCode = res.statusCode ===200 ? 500 :res.statusCode;
    let message = err.message || "Internal Server Error";

     // Handle Mongoose validation errors
     if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = "mongoose validation error";
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field value entered: ${JSON.stringify(err.keyValue)}`;
    }
     if (err.name === "NotFound") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
}

module.exports = errorHandler;