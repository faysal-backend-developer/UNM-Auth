import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { IDepartment } from './Department.interface';
import { department } from './Department.model';
import { IGenericResponse } from '../../Shared/genericResponse.td';
import { IPaginationOption } from '../../interfaces/paginationOption';
import { buildSortObject } from '../../Shared/dynamicSorting';

const createDepartment = async (
  payload: IDepartment,
): Promise<IDepartment | null> => {
  const result = (await department.create(payload)).populate({
    path: 'faculty',
  });

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Error creating department');
  }

  return result;
};

const readSingleDepartment = async (
  id: string,
): Promise<IDepartment | null> => {
  const result = await department.findById({ _id: id }).populate({
    path: 'faculty',
  });

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Department not found');
  }

  return result;
};

type ISearchOptions = {
  searchTerm?: string;
};

// ! All Data Read :
const readDepartment = async (
  paginationOption: IPaginationOption,
  searchOption: ISearchOptions,
): Promise<IGenericResponse<IDepartment[] | null>> => {
  // Pagination Data Destruction
  const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;
  const { searchTerm } = searchOption;
  const sortObject = buildSortObject(sortBy, sortOrder);

  const skip = (Number(page) - 1) * Number(limit);

  const andCondition = [];

  // FIXME - Dot Notation is not working properly with   faculty.title

  if (searchTerm) {
    andCondition.push({
      $or: [
        {
          title: {
            $regex: searchTerm,
            $options: 'i',
          },
        },
        // {
        //     'faculty.title': {
        //         $regex: searchTerm,
        //         $options: 'i'
        //     }
        // }
      ],
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await department
    .find(whereCondition)
    .populate({
      path: 'faculty',
    })
    .limit(Number(limit))
    .skip(skip)
    .sort(sortObject);
  const total = await department.countDocuments();
  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'No departments found');
  }
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
    },
  };
};

const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>,
): Promise<IDepartment> => {
  const result = await department
    .findByIdAndUpdate({ _id: id }, payload, { new: true })
    .populate({
      path: 'faculty',
    });

  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Couldn't updated department");
  }

  return result;
};

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await department.findByIdAndDelete({
    _id: id,
  });
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Department not found');
  }
  return result;
};

export const DepartmentService = {
  createDepartment,
  readSingleDepartment,
  updateDepartment,
  deleteDepartment,
  readDepartment,
};
