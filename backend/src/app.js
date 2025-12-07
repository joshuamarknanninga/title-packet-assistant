// backend/src/middleware/errorHandler.js

// Express error-handling middleware (4 args: err, req, res, next)
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const status = err.statusCode || err.status || 500;

  res.status(status).json({
    error: 'Internal server error',
    message: err.message || 'Something went wrong'
  });
};
