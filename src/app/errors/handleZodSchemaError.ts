import { ZodError, ZodIssue } from 'zod';
import {
  IGenericErrorMessage,
  IGenericErrorResponse,
} from '../interfaces/global.interfaces';

export const handleZodSchemaError = (
  error: ZodError,
): IGenericErrorResponse => {
  const formattedErrors: IGenericErrorMessage[] = error.issues.map(
    (err: ZodIssue) => ({
      path: err.path[err.path.length - 1],
      message: err.message,
    }),
  );

  return {
    statusCode: 400,
    message: 'Zod Validation Failed',
    errorMessage: formattedErrors,
  };
};
