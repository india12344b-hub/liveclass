import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AuthenticationError, ConflictError, ValidationError } from '../errors/custom.errors.js';

const users = [];

const createToken = (user, secret, expiresIn) => jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn });

export const authService = {
  async register({ name, email, password }) {
    const existing = users.find((user) => user.email === email);
    if (existing) {
      throw new ConflictError('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: `${users.length + 1}`,
      name,
      email,
      password: passwordHash,
      role: 'user',
    };

    users.push(newUser);

    const accessToken = createToken(newUser, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = createToken(newUser, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN);

    return {
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role },
      accessToken,
      refreshToken,
    };
  },

  async login({ email, password }) {
    const user = users.find((entry) => entry.email === email);
    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new AuthenticationError('Invalid credentials');
    }

    const accessToken = createToken(user, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
    const refreshToken = createToken(user, env.JWT_REFRESH_SECRET, env.JWT_REFRESH_EXPIRES_IN);

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken,
      refreshToken,
    };
  },

  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new AuthenticationError('Refresh token is required');
    }

    try {
      const payload = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
      const user = users.find((entry) => entry.id === payload.sub);
      if (!user) {
        throw new AuthenticationError('Invalid refresh token');
      }
      const accessToken = createToken(user, env.JWT_ACCESS_SECRET, env.JWT_ACCESS_EXPIRES_IN);
      return { accessToken };
    } catch (error) {
      throw new AuthenticationError('Invalid refresh token');
    }
  },
};
