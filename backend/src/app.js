import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { env } from './config/env.js';
import logger from './config/logger.js';
import { requestLogger, responseLogger, errorLogger, exceptionLogger, rejectionLogger } from './middlewares/logging.middleware.js';
import routes from './routes/index.js';
import errorMiddleware from './middlewares/error.middleware.js';

config();

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(requestLogger);
app.use(responseLogger);

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'Service is healthy', data: { status: 'ok' } });
});

app.use('/api', routes);

app.use(errorMiddleware);

process.on('uncaughtException', exceptionLogger);
process.on('unhandledRejection', rejectionLogger);

export default app;
