import { Response } from 'express';

const requestHandler = <T>(
  res: Response,
  data: {
    statusCode: number;
    message: string;
    data: T;
  },
) => {
  return res.status(data.statusCode).json({
    statusCode: data.statusCode,
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default requestHandler;
