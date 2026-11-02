function sendSuccess(res, message = 'Success', data = null, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function sendError(res, message = 'An error occurred', statusCode = 500, error = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    data: null,
    ...(process.env.NODE_ENV !== 'production' && error ? { error: error.message || error } : {})
  });
}

module.exports = {
  sendSuccess,
  sendError
};
