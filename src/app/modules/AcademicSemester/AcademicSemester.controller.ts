/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './AcademicSemester.service';
import catchAsync from '../../Shared/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../Shared/requestHandler';
import { IPaginationOption } from '../../interfaces/paginationOption';
import pick from '../../Shared/pick';

const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semester } = req.body;
    const create = await AcademicSemesterService.createSemester(semester);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester created successfully',
      data: create,
    });
  },
);

const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions: IPaginationOption = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);

    const result =
      await AcademicSemesterService.getAllSemester(paginationOptions);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'All Semesters Find successfully',
      data: result.data,
      meta: result.meta,
    });
  },
);

export const AcademicSemesterController = {
  create,
  getAllSemester,
};
