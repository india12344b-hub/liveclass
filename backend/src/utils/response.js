export const successResponse = ({ res, statusCode = 200, message = 'Success', data = {}, meta = {}, requestId }) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta,
    requestId,
  });
};

export const errorResponse = ({ res, statusCode = 500, message = 'Internal server error', code = 'INTERNAL_SERVER_ERROR', errors = [], requestId }) => {
  return res.status(statusCode).json({
    success: false,
    message,
    code,
    errors,
    requestId,
  });
};
