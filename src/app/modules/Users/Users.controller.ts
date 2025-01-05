import { Request, Response } from 'express';
import { userService } from './Users.service';
import catchAsync from '../../Shared/catchAsync';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import { IUser } from './Users.interface';

const createStudent = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { student, ...userData } = req.body;
    const result = await userService.createStudent(student, userData);
    sendResponse<IUser | null>(res, {
      statusCode: StatusCodes.OK,
      message: 'Student created successfully',
      success: true,
      data: result,
    });
  },
);

export const userController = {
  createStudent,
};
