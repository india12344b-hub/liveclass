import logger from '../config/logger.js';

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const payload = {
    success: false,
    message: err.message || 'Internal server error',
    code: err.code || 'INTERNAL_SERVER_ERROR',
    errors: err.errors || [],
    requestId: req.requestId,
  };

  logger.error('request_failed', { requestId: req.requestId, statusCode, payload });
  res.status(statusCode).json(payload);
};

export default errorMiddleware;
