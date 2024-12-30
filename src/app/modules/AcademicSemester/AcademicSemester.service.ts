import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { academicSemesterTitleCodeMapper } from './AcademicSemester.constant';
import { IAcademicSemester } from './AcademicSemester.interface';
import { academicSemester } from './AcademicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await academicSemester.create(payload);
  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'Academic Semester creation failed',
    );
  }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
