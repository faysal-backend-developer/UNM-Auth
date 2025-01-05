import { Request, Response } from 'express';
import catchAsync from '../../Shared/catchAsync';
import { StudentService } from './Student.service';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import { IStudent } from './Student.interface';

const getAllStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await StudentService.getallStudent();

    sendResponse<IStudent[] | null>(res, {
      statusCode: StatusCodes.OK,
      message: 'Student list fetched successfully',
      success: true,
      data: result,
    });
  },
);

export const StudentController = {
  getAllStudent,
};
