import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { IFaculty, ISearchOptions } from './Faculty.interface';
import { faculty } from './Faculty.model';
import { IGenericResponse } from '../../Shared/genericResponse.td';
import { IPaginationOption } from '../../interfaces/paginationOption';
import { buildSortObject } from '../../Shared/dynamicSorting';

const createFaculty = async (payload: IFaculty): Promise<IFaculty | null> => {
  const isExist = await faculty.findOne({
    title: payload.title,
  });

  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Faculty is already exists');
  }

  const result = await faculty.create(payload);

  if (!result) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Could not create Faculty');
  }

  return result;
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await faculty.findById(id);

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
  }

  return result;
};

const getAllFaculty = async (
  paginationOption: IPaginationOption,
  searchOptions: ISearchOptions,
): Promise<IGenericResponse<IFaculty[] | null>> => {
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
  const result = await faculty
    .find(whereCondition)
    .limit(Number(limit))
    .skip(skip)
    .sort(sortObject);
  const total = await faculty.countDocuments();

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Faculty not found');
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

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>,
): Promise<IFaculty> => {
  const isFind = await faculty.findOne({ _id: id });

  if (!isFind) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Can not find faculty');
  }

  const result = await faculty.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Can not update faculty');
  }

  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty> => {
  const result = await faculty.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Can not delete faculty');
  }

  return result;
};

export const FacultyService = {
  createFaculty,
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
};
