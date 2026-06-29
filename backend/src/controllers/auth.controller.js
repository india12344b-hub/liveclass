import { authService } from '../services/auth.service.js';
import { successResponse } from '../utils/response.js';
import { ValidationError } from '../errors/custom.errors.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

export const authController = {
  async register(req, res, next) {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        throw new ValidationError('Validation failed', error.details.map((detail) => detail.message));
      }
      const result = await authService.register(value);
      return successResponse({ res, statusCode: 201, message: 'User registered successfully', data: result, requestId: req.requestId });
    } catch (err) {
      next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        throw new ValidationError('Validation failed', error.details.map((detail) => detail.message));
      }
      const result = await authService.login(value);
      return successResponse({ res, statusCode: 200, message: 'Login successful', data: result, requestId: req.requestId });
    } catch (err) {
      next(err);
    }
  },

  async refresh(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
      const result = await authService.refreshToken(refreshToken);
      return successResponse({ res, statusCode: 200, message: 'Token refreshed', data: result, requestId: req.requestId });
    } catch (err) {
      next(err);
    }
  },
};
