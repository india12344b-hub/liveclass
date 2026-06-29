import logger from '../config/logger.js';

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  req.requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  res.on('finish', () => {
    logger.info('request', {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      durationMs: Date.now() - start,
      ip: req.ip,
    });
  });
  next();
};

export const responseLogger = (_req, _res, next) => next();

export const errorLogger = (err, _req, _res, next) => {
  logger.error('error', { message: err.message, stack: err.stack });
  next(err);
};

export const exceptionLogger = (err) => {
  logger.error('uncaughtException', { message: err.message, stack: err.stack });
};

export const rejectionLogger = (reason) => {
  logger.error('unhandledRejection', { message: reason?.message || reason });
};
