export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: {
    path: string | number;
    message: string;
  }[];
};
