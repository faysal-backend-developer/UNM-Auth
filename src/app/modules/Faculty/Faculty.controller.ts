import { Request, Response } from 'express';
import catchAsync from '../../Shared/catchAsync';
import { FacultyService } from './Faculty.service';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import pick from '../../Shared/pick';

const createFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { faculty } = req.body;
    const result = await FacultyService.createFaculty(faculty);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty created successfully',
      data: result,
    });
  },
);

const getSingleFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await FacultyService.getSingleFaculty(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty retrieved successfully',
      data: result,
    });
  },
);

const getAllFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const searchOptions = pick(req.query, ['searchTerm']);
    const result = await FacultyService.getAllFaculty(
      paginationOptions,
      searchOptions,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty retrieved successfully',
      data: result.data,
      meta: result.meta,
    });
  },
);

const updateFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await FacultyService.updateFaculty(id, faculty);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty updated successfully',
      data: result,
    });
  },
);

const deleteFaculty = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await FacultyService.deleteFaculty(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Faculty deleted successfully',
      data: result,
    });
  },
);
export const FacultyController = {
  createFaculty,
  getSingleFaculty,
  getAllFaculty,
  updateFaculty,
  deleteFaculty,
};
