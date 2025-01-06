import { Request, Response } from 'express';
import catchAsync from '../../Shared/catchAsync';
import { StudentService } from './Student.service';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from './Student.interface';
import pick from '../../Shared/pick';
import { filterableFields } from './Student.constants';

const getAllStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const searchOptions = pick(req.query, filterableFields);

    const result = await StudentService.getallStudent(
      paginationOptions,
      searchOptions,
    );

    sendResponse<IStudent[] | null>(res, {
      statusCode: StatusCodes.OK,
      message: 'Student list fetched successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  },
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await StudentService.getSingleStudent(id);

    sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student details fetched successfully',
      data: result,
    });
  },
);

const updateStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    const { ...studentData } = req.body;
    const result = await StudentService.updateStudent(id, studentData);
    sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student updated successfully',
      data: result,
    });
  },
);

const deleteStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await StudentService.deleteStudent(id);
    sendResponse<IStudent | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  },
);

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
