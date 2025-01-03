import { Request, Response } from 'express';
import catchAsync from '../../Shared/catchAsync';
import { AcademicFacultyService } from './AcademicFaculty.service';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import pick from '../../Shared/pick';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { faculty } = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(faculty);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const searchOptions = pick(req.query, ['searchTerm']);
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      paginationOptions,
      searchOptions,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  },
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      faculty,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await AcademicFacultyService.deleteAcademicFaculty(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty deleted successfully',
      data: result,
    });
  },
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
