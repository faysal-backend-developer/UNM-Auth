import ApiError from '../../globalErrorHandler/ApiError';
import { academicSemesterTitleCodeMapper } from './AcademicSemester.contant';
import { IAcademicSemester } from './AcademicSemester.interface';
import { academicSemester } from './AcademicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(500, 'Invalid Semester Code');
  }

  const result = await academicSemester.create(payload);
  if (!result) {
    throw new ApiError(400, 'Academic Semester creation failed');
  }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
