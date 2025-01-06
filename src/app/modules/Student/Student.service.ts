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

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await student.findById({ _id: id });

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const result = await student.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    { new: true },
  );

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  return result;
};

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await student.findByIdAndDelete({
    _id: id,
  });

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }
  return result;
};

export const StudentService = {
  getallStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
