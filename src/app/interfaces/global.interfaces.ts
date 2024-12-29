export type IGenericErrorMessage = {
  path: string;
  message: string;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: {
    path: string;
    message: string;
  }[];
};
