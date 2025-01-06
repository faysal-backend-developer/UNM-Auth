'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_codes_1 = require('http-status-codes');
const handleCastError = (error) => {
  const statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
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
exports.default = handleCastError;
