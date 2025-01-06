"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationError_1 = require("../errors/handleValidationError");
const ApiError_1 = __importDefault(require("./ApiError"));
const logger_1 = require("../../utils/winston/logger");
const handleZodSchemaError_1 = require("../errors/handleZodSchemaError");
const zod_1 = require("zod");
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const globalErrorHandler = (error, req, res, next) => {
    config_1.default.node_env === 'development'
        ? console.log(` Global Error Handler : ${error}`)
        : logger_1.errorLogger.error(`Global Error Handler : ${error}`);
    let statusCode = 500;
    let message = 'internal Server Error ';
    let errorMessages = [];
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessage;
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodSchemaError_1.handleZodSchemaError)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessage;
    }
    else if (error instanceof ApiError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    message: error.message,
                    path: '',
                },
            ]
            : [];
    }
    else if (error.name == 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessage;
    }
    else if (error instanceof Error) {
        (statusCode = 500),
            (message = (error === null || error === void 0 ? void 0 : error.message) || 'Internal Server Error'),
            (errorMessages = (error === null || error === void 0 ? void 0 : error.message)
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
        stack: config_1.default.node_env === 'development' ? error.stack : undefined,
    });
    // next()
    // ! when we use next() instead of next on the same node  find some Error Report : Cannot set headers after they are sent to the client
};
exports.default = globalErrorHandler;
