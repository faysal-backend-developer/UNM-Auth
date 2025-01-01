import { NextFunction, Request, Response } from 'express';
import { userService } from './Users.service';
import catchAsync from '../../Shared/catchAsync';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user } = req.body;
    const result = await userService.createUser(user);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'User created successfully',
      success: true,
      data: result,
    });
    next();
  },
);

export const userController = {
  createUser,
};
