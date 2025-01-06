"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleZodSchemaError = void 0;
const handleZodSchemaError = (error) => {
    const formattedErrors = error.issues.map((err) => ({
        path: err.path[err.path.length - 1],
        message: err.message,
    }));
    return {
        statusCode: 400,
        message: 'Zod Validation Failed',
        errorMessage: formattedErrors,
    };
};
exports.handleZodSchemaError = handleZodSchemaError;
