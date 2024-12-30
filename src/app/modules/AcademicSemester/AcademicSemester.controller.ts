import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './AcademicSemester.service';
import catchAsync from '../../Shared/catchAsync';
import requestHandler from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';

const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semester } = req.body;
    const create = await AcademicSemesterService.createSemester(semester);

    next();

    requestHandler(res, {
      statusCode: StatusCodes.OK,
      message: 'Semester created successfully',
      data: create,
    });
  },
);

export const AcademicSemesterController = {
  create,
};
