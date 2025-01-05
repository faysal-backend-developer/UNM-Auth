/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './AcademicSemester.service';
import catchAsync from '../../Shared/catchAsync';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../Shared/requestHandler';
import { IPaginationOption } from '../../interfaces/paginationOption';
import pick from '../../Shared/pick';
import { IAcademicSemester } from './AcademicSemester.interface';

// !: Create Academic Semester
const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { semester } = req.body;
    const create = await AcademicSemesterService.createSemester(semester);

    sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester created successfully',
      data: create,
    });
  },
);

// ! : Get All Semester
const getAllSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filterableFields = pick(req.query, ['searchTerm', 'year', 'title']);

    // console.log(filterableFields)
    const paginationOptions: IPaginationOption = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);

    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions,
      filterableFields,
    );

    sendResponse<IAcademicSemester[] | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'All Semesters Find successfully',
      data: result.data,
      meta: result.meta,
    });
  },
);

// ! : Get single Semester
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicSemesterService.getSingleSemester(id);

    sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Find successfully',
      data: result,
    });
  },
);

// ! : Update Academic Semester
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const { semester } = req.body;
    const result = await AcademicSemesterService.updateAcademicSemester(
      id,
      semester,
    );

    sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Semester Update successfully',
      data: result,
    });
  },
);

// ! : Delete Academic Semester
const deleteAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicSemesterService.deleteAcademicSemester(id);

    sendResponse<IAcademicSemester | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Semester Delete successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  create,
  getAllSemester,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
