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
exports.DepartmentService = void 0;
const http_status_codes_1 = require('http-status-codes');
const ApiError_1 = __importDefault(
  require('../../globalErrorHandler/ApiError'),
);
const Department_model_1 = require('./Department.model');
const dynamicSorting_1 = require('../../Shared/dynamicSorting');
const createDepartment = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield Department_model_1.department.create(
      payload,
    )).populate({
      path: 'academicFaculty',
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        'Error creating department',
      );
    }
    return result;
  });
const readSingleDepartment = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Department_model_1.department
      .findById({ _id: id })
      .populate({
        path: 'academicFaculty',
      });
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Department not found',
      );
    }
    return result;
  });
// ! All Data Read :
const readDepartment = (paginationOption, searchOption) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Pagination Data Destruction
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;
    const { searchTerm } = searchOption;
    const sortObject = (0, dynamicSorting_1.buildSortObject)(sortBy, sortOrder);
    const skip = (Number(page) - 1) * Number(limit);
    const andCondition = [];
    // FIXME - Dot Notation is not working properly with   faculty.title
    if (searchTerm) {
      andCondition.push({
        $or: [
          {
            title: {
              $regex: searchTerm,
              $options: 'i',
            },
          },
          // {
          //     'faculty.title': {
          //         $regex: searchTerm,
          //         $options: 'i'
          //     }
          // }
        ],
      });
    }
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield Department_model_1.department
      .find(whereCondition)
      .populate({
        path: 'academicFaculty',
      })
      .limit(Number(limit))
      .skip(skip)
      .sort(sortObject);
    const total = yield Department_model_1.department.countDocuments();
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        'No departments found',
      );
    }
    return {
      data: result,
      meta: {
        total,
        page,
        limit,
      },
    };
  });
const updateDepartment = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Department_model_1.department
      .findByIdAndUpdate({ _id: id }, payload, { new: true })
      .populate({
        path: 'academicFaculty',
      });
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        "Couldn't updated department",
      );
    }
    return result;
  });
const deleteDepartment = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Department_model_1.department.findByIdAndDelete({
      _id: id,
    });
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NOT_FOUND,
        'Department not found',
      );
    }
    return result;
  });
exports.DepartmentService = {
  createDepartment,
  readSingleDepartment,
  updateDepartment,
  deleteDepartment,
  readDepartment,
};
