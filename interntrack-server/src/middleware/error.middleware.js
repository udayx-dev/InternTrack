const AppError = require("../utils/AppError");

/**
 * Global error handler — must be the LAST middleware registered.
 * Express identifies it by the 4-argument signature (err, req, res, next).
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    error = new AppError(`Resource not found.`, 404);
  }

  // Mongoose duplicate key (unique field violation)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new AppError(`An account with this ${field} already exists.`, 409);
  }

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new AppError(messages.join(". "), 400);
  }

  // JWT invalid signature
  if (err.name === "JsonWebTokenError") {
    error = new AppError("Invalid token. Please log in again.", 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    error = new AppError("Token expired. Please log in again.", 401);
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  // Never expose stack traces in production
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { errorHandler };