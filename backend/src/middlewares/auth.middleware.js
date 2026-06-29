import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthenticationError, AuthorizationError } from '../errors/custom.errors.js';

export const authenticate = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return next(new AuthenticationError('Access token is required'));
  }

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    next(new AuthenticationError('Invalid access token'));
  }
};

export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new AuthenticationError('Authentication required'));
  }

  if (!roles.includes(req.user.role)) {
    return next(new AuthorizationError('Insufficient permissions'));
  }

  next();
};
