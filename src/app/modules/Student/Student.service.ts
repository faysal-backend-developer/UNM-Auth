import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { IStudent } from './Student.interface';
import { student } from './Student.model';

const getallStudent = async (): Promise<IStudent[] | null> => {
  const result = await student.find();

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  return result;
};

export const StudentService = {
  getallStudent,
};
