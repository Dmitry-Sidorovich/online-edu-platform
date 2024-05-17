import { ErrorRequestHandler } from 'express';
import {
  NotFoundError,
  AuthenticationError,
  ValidationError,
} from '../utils/errors';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;

  if (err instanceof NotFoundError) {
    statusCode = 404;
  } else if (err instanceof AuthenticationError) {
    statusCode = 401;
  } else if (err instanceof ValidationError) {
    statusCode = 400;
  }

  console.error(err);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
