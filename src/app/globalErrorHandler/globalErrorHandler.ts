/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../interfaces/global.interfaces';
import { handleValidationError } from '../errors/handleValidationError';
import ApiError from './ApiError';
import { errorLogger } from '../../utils/winston/logger';
import { handleZodSchemaError } from '../errors/handleZodSchemaError';
import { ZodError } from 'zod';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  config.node_env === 'development'
    ? console.log(` Global Error Handler : ${error}`)
    : errorLogger.error(`Global Error Handler : ${error}`);

  let statusCode: number = 500;
  let message: string = 'internal Server Error ';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodSchemaError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessage;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            message: error.message,
            path: '',
          },
        ]
      : [];
  } else if (error.name == 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError?.errorMessage;
  } else if (error instanceof Error) {
    (statusCode = 500),
      (message = error?.message || 'Internal Server Error'),
      (errorMessages = error?.message
        ? [
            {
              path: ' ',
              message: error.message || 'Internal Server Error',
            },
          ]
        : []);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorMessage: errorMessages,
    stack: config.node_env === 'development' ? error.stack : undefined,
  });
  // next()
  // ! when we use next() instead of next on the same node  find some Error Report : Cannot set headers after they are sent to the client
};

export default globalErrorHandler;
