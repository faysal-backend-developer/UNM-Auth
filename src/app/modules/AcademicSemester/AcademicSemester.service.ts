import ApiError from '../../globalErrorHandler/ApiError';
import { IAcademicSemester } from './AcademicSemester.interface';
import { academicSemester } from './AcademicSemester.model';

const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const result = await academicSemester.create(payload);
  if (!result) {
    throw new ApiError(400, 'Academic Semester creation failed');
  }
  return result;
};

export const AcademicSemesterService = {
  createSemester,
};
