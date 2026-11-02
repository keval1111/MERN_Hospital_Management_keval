const logger = require('../config/logger');
const { sendError } = require('../helpers/response');

function errorHandler(err, req, res, next) {
  logger.error('Unhandled Application Error: %s', err.stack || err.message);

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    return sendError(res, `File Upload Error: ${err.message}`, 400);
  }

  // Handle JWT validation errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return sendError(res, 'Authentication token is invalid or has expired.', 401);
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  return sendError(res, message, statusCode, err);
}

module.exports = errorHandler;
