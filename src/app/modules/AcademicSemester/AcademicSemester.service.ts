import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { academicSemesterTitleCodeMapper } from './AcademicSemester.constant';
import {
  IAcademicSemester,
  IFilterableField,
} from './AcademicSemester.interface';
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
  filterableField: IFilterableField,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;

  const skip = (Number(page) - 1) * Number(limit);

  const { searchTerm, ...filterField } = filterableField;

  const searchableField = ['title', 'code', 'year', 'startMonth', 'endMonth'];

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterField).length > 0) {
    andCondition.push({
      $and: Object.entries(filterField).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Where Condition should be filtered based on the conditions
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  // Dynamic Sorting :
  const sortObject = buildSortObject(sortBy as string, sortOrder as string);
  const result = await academicSemester
    .find(whereCondition)
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

const getSingleSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await academicSemester.findById(id);

  if (!result) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      "Couldn't Find Academic Semester",
    );
  }

  return result;
};

const updateAcademicSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>,
): Promise<IAcademicSemester | null> => {
  const firstFind = await academicSemester.findById(id);

  if (!firstFind) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      "Couldn't Find Academic Semester",
    );
  }

  if (payload?.title && payload?.code) {
    if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        'Invalid Academic Semester Title and Code',
      );
    }
  }

  const findAll = await academicSemester.find(
    {},
    { title: 1, year: 1, _id: 0 },
  );

  if (
    findAll &&
    typeof findAll === 'object' &&
    Object.keys(findAll).length > 0
  ) {
    if (Array.isArray(findAll) && findAll.length > 0) {
      findAll.forEach((entry) => {
        if (entry.title === payload?.title && entry.year == payload?.year) {
          throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Academic Semester Already Exist',
          );
        }
      });
    }
  }

  const result = await academicSemester.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      "Couldn't Update Academic Semester",
    );
  }

  return result;
};

const deleteAcademicSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await academicSemester.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      "Couldn't Delete Academic Semester",
    );
  }

  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
