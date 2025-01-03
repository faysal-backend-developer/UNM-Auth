import { Request, Response } from 'express';
import catchAsync from '../../Shared/catchAsync';
import { DepartmentService } from './Department.service';
import sendResponse from '../../Shared/requestHandler';
import { StatusCodes } from 'http-status-codes';
import pick from '../../Shared/pick';

const createDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { department } = req.body;

    const result = await DepartmentService.createDepartment(department);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Department created successfully',
      success: true,
      data: result,
    });
  },
);

const readSingleDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await DepartmentService.readSingleDepartment(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Department read successfully',
      success: true,
      data: result,
    });
  },
);

const updateDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { department } = req.body;
    const result = await DepartmentService.updateDepartment(id, department);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Department updated successfully',
      success: true,
      data: result,
    });
  },
);

const deleteDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await DepartmentService.deleteDepartment(id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Department deleted successfully',
      success: true,
      data: result,
    });
  },
);

const readDepartment = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);

    const searchOptions = pick(req.query, ['searchTerm']);
    const result = await DepartmentService.readDepartment(
      paginationOptions,
      searchOptions,
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: 'Departments read successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  },
);

export const DepartmentController = {
  createDepartment,
  readSingleDepartment,
  updateDepartment,
  deleteDepartment,
  readDepartment,
};
