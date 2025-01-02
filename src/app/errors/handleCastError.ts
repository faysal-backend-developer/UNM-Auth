import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

const handleCastError = (error: mongoose.Error.CastError) => {
  const statusCode = StatusCodes.BAD_REQUEST;
  return {
    statusCode,
    message: 'Mongoose Cast Error',
    errorMessage: [
      {
        path: error.path ? error.path : 'Invalid Path',
        message: 'Cast Error',
      },
    ],
  };
};

export default handleCastError;
