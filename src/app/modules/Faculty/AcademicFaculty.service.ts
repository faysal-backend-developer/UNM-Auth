import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { IAcademicFaculty, ISearchOptions } from './AcademicFaculty.interface';
import { academicFaculty } from './AcademicFaculty.model';
import { IGenericResponse } from '../../Shared/genericResponse.td';
import { IPaginationOption } from '../../interfaces/paginationOption';
import { buildSortObject } from '../../Shared/dynamicSorting';

const createAcademicFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const isExist = await academicFaculty.findOne({
    title: payload.title,
  });

  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic Faculty is already exists',
    );
  }

  const result = await academicFaculty.create(payload);

  if (!result) {
    throw new ApiError(
      StatusCodes.NOT_ACCEPTABLE,
      'Could not create Academic Faculty',
    );
  }

  return result;
};

const getSingleAcademicFaculty = async (
  id: string,
): Promise<IAcademicFaculty | null> => {
  const result = await academicFaculty.findById(id);

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Academic Faculty not found');
  }

  return result;
};

const getAllAcademicFaculty = async (
  paginationOption: IPaginationOption,
  searchOptions: ISearchOptions,
): Promise<IGenericResponse<IAcademicFaculty[] | null>> => {
  const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;

  const skip = (Number(page) - 1) * Number(limit);

  const sortObject = buildSortObject(sortBy as string, sortOrder as string);

  const andCondition = [];

  if (searchOptions?.searchTerm) {
    andCondition.push({
      $or: [{ title: { $regex: searchOptions.searchTerm, $options: 'i' } }],
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await academicFaculty
    .find(whereCondition)
    .limit(Number(limit))
    .skip(skip)
    .sort(sortObject);
  const total = await academicFaculty.countDocuments();

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Academic Faculty not found');
  }

  return {
    meta: {
      total,
      limit: Number(limit),
      page: Number(page),
    },
    data: result,
  };
};

const updateAcademicFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty> => {
  const isFind = await academicFaculty.findOne({ _id: id });

  if (!isFind) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Can not find Academic faculty');
  }

  const result = await academicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new ApiError(
      StatusCodes.NO_CONTENT,
      'Can not update Academic faculty',
    );
  }

  return result;
};

const deleteAcademicFaculty = async (id: string): Promise<IAcademicFaculty> => {
  const result = await academicFaculty.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Can not delete faculty');
  }

  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
