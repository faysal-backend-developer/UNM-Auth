import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { academicSemesterTitleCodeMapper } from './AcademicSemester.constant';
import { IAcademicSemester } from './AcademicSemester.interface';
import { academicSemester } from './AcademicSemester.model';
import { IPaginationOption } from '../../interfaces/paginationOption';
import { IGenericResponse } from '../../Shared/genericResponse.td';
import { buildSortObject } from '../../Shared/dynamicSorting';

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

const getAllSemester = async (
  paginationOption: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, sortBy, sortOrder } = paginationOption;

  const skip = (Number(page) - 1) * Number(limit);

  const sortObject = buildSortObject(sortBy as string, sortOrder as string);
  const result = await academicSemester
    .find({})
    .sort(sortObject)
    .limit(Number(limit))
    .skip(skip);
  const total = await academicSemester.countDocuments();
  if (!result) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      "Couldn't  Find Academic Semester",
    );
  }
  return {
    data: result,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
    },
  };
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
};
