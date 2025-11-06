// backend/src/middleware/errorHandler.js
/**
 * Error Handling Middleware
 * Centralized error handling for all routes
 */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Async error wrapper
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Error handling middleware
 */
const errorHandler = (err, req, res, next) => {
  const { message, statusCode } = err;

  // Default error
  let status = statusCode || 500;
  let errorMessage = message || 'Internal Server Error';

  // Specific error handling
  if (err.code === 'ER_DUP_ENTRY') {
    status = 409;
    errorMessage = 'Resource already exists';
  } else if (err.code === 'ER_BAD_FIELD_ERROR') {
    status = 400;
    errorMessage = 'Invalid field';
  } else if (err.message && err.message.includes('ECONNREFUSED')) {
    status = 503;
    errorMessage = 'Database connection error';
  }

  // Log error
  console.error(`[${new Date().toISOString()}] ${status} - ${errorMessage}`);
  console.error(err);

  // Send error response
  res.status(status).json({
    success: false,
    error: errorMessage,
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
};

/**
 * 404 Not Found middleware
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path
  });
};

module.exports = {
  AppError,
  asyncHandler,
  errorHandler,
  notFoundHandler
};