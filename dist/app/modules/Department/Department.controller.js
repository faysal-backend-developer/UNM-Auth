'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DepartmentController = void 0;
const catchAsync_1 = __importDefault(require('../../Shared/catchAsync'));
const Department_service_1 = require('./Department.service');
const requestHandler_1 = __importDefault(
  require('../../Shared/requestHandler'),
);
const http_status_codes_1 = require('http-status-codes');
const pick_1 = __importDefault(require('../../Shared/pick'));
const createDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { department } = req.body;
    const result =
      yield Department_service_1.DepartmentService.createDepartment(department);
    (0, requestHandler_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Department created successfully',
      success: true,
      data: result,
    });
  }),
);
const readSingleDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield Department_service_1.DepartmentService.readSingleDepartment(id);
    (0, requestHandler_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Department read successfully',
      success: true,
      data: result,
    });
  }),
);
const updateDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { department } = req.body;
    const result =
      yield Department_service_1.DepartmentService.updateDepartment(
        id,
        department,
      );
    (0, requestHandler_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Department updated successfully',
      success: true,
      data: result,
    });
  }),
);
const deleteDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result =
      yield Department_service_1.DepartmentService.deleteDepartment(id);
    (0, requestHandler_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Department deleted successfully',
      success: true,
      data: result,
    });
  }),
);
const readDepartment = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ]);
    const searchOptions = (0, pick_1.default)(req.query, ['searchTerm']);
    const result = yield Department_service_1.DepartmentService.readDepartment(
      paginationOptions,
      searchOptions,
    );
    (0, requestHandler_1.default)(res, {
      statusCode: http_status_codes_1.StatusCodes.OK,
      message: 'Departments read successfully',
      success: true,
      data: result.data,
      meta: result.meta,
    });
  }),
);
exports.DepartmentController = {
  createDepartment,
  readSingleDepartment,
  updateDepartment,
  deleteDepartment,
  readDepartment,
};
