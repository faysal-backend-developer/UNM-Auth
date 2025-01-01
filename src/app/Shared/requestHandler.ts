import { Response } from 'express';
type apiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
  meta?: {
    page?: number | null;
    limit?: number | null;
    total?: number | null;
  } | null;
};
const sendResponse = async <T>(
  res: Response,
  data: apiResponse<T>,
): Promise<void> => {
  const responseData: apiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
    meta: data.meta || null,
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
