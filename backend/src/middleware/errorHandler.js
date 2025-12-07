// backend/src/middleware/errorHandler.js

// Express error-handling middleware must have 4 params: (err, req, res, next)
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // If a multer or validation error has a statusCode, respect it
  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong',
  });
};
