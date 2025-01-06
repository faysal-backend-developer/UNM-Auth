/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { StatusCodes } from 'http-status-codes';
import ApiError from '../../globalErrorHandler/ApiError';
import { IFilterableFields, IStudent } from './Student.interface';
import { student } from './Student.model';
import { IPaginationOption } from '../../interfaces/paginationOption';
import { buildSortObject } from '../../Shared/dynamicSorting';
import { searchableFields } from './Student.constants';
import { IGenericResponse } from '../../Shared/genericResponse.td';

const getallStudent = async (
  paginationOptions: IPaginationOption,
  searchOption: IFilterableFields,
): Promise<IGenericResponse<IStudent[] | null>> => {
  const { page, limit, sortBy, sortOrder } = paginationOptions;
  const skip = (Number(page) - 1) * Number(limit);
  const sortObject = buildSortObject(sortBy, sortOrder);

  const { searchTerm, ...filterableFields } = searchOption;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filterableFields).length > 0) {
    andCondition.push({
      $and: Object.entries(filterableFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await student
    .find(whereCondition)
    .limit(Number(limit))
    .skip(skip)
    .sort(sortObject);
  const total = await student.countDocuments(whereCondition);

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  return {
    data: result,
    meta: {
      total,
      limit: Number(limit),
      page: Number(page),
    },
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await student.findById({ _id: id });

  if (!result) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  return result;
};

const updateStudent = async (
  studentId: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const isExist = await student.findOne({
    id: studentId,
  });
  console.log(isExist);
  if (!isExist) {
    throw new ApiError(StatusCodes.NO_CONTENT, 'Student not found');
  }

  const { id, name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = { ...studentData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach((key) => {
      const nameKey = `guardian.${key}`;
      (updatedStudentData as any)[nameKey] =
        guardian[key as keyof typeof guardian];
    });
  }

  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach((key) => {
      const nameKey = `localGuardian.${key}`;
      (updatedStudentData as any)[nameKey] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }

  const result = await student.findOneAndUpdate(
    {
      id: studentId,
    },
    updatedStudentData,
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
