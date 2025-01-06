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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterService = void 0;
const http_status_codes_1 = require('http-status-codes');
const ApiError_1 = __importDefault(
  require('../../globalErrorHandler/ApiError'),
);
const AcademicSemester_constant_1 = require('./AcademicSemester.constant');
const AcademicSemester_model_1 = require('./AcademicSemester.model');
const dynamicSorting_1 = require('../../Shared/dynamicSorting');
const createSemester = (payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (
      AcademicSemester_constant_1.academicSemesterTitleCodeMapper[
        payload.title
      ] !== payload.code
    ) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Invalid Semester Code',
      );
    }
    const result =
      yield AcademicSemester_model_1.academicSemester.create(payload);
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.BAD_REQUEST,
        'Academic Semester creation failed',
      );
    }
    return result;
  });
const getAllSemester = (paginationOption, filterableField) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;
    const skip = (Number(page) - 1) * Number(limit);
    const { searchTerm } = filterableField,
      filterField = __rest(filterableField, ['searchTerm']);
    const searchableField = ['title', 'code', 'year', 'startMonth', 'endMonth'];
    const andCondition = [];
    if (searchTerm) {
      andCondition.push({
        $or: searchableField.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      });
    }
    if (Object.keys(filterField).length > 0) {
      andCondition.push({
        $and: Object.entries(filterField).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
    // Where Condition should be filtered based on the conditions
    const whereCondition =
      andCondition.length > 0 ? { $and: andCondition } : {};
    // Dynamic Sorting :
    const sortObject = (0, dynamicSorting_1.buildSortObject)(sortBy, sortOrder);
    const result = yield AcademicSemester_model_1.academicSemester
      .find(whereCondition)
      .sort(sortObject)
      .limit(Number(limit))
      .skip(skip);
    const total =
      yield AcademicSemester_model_1.academicSemester.countDocuments();
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        "Couldn't  Find Academic Semester",
      );
    }
    return {
      data: result,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
      },
    };
  });
const getSingleSemester = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AcademicSemester_model_1.academicSemester.findById(id);
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        "Couldn't Find Academic Semester",
      );
    }
    return result;
  });
const updateAcademicSemester = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const firstFind =
      yield AcademicSemester_model_1.academicSemester.findById(id);
    if (!firstFind) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        "Couldn't Find Academic Semester",
      );
    }
    if (
      (payload === null || payload === void 0 ? void 0 : payload.title) &&
      (payload === null || payload === void 0 ? void 0 : payload.code)
    ) {
      if (
        AcademicSemester_constant_1.academicSemesterTitleCodeMapper[
          payload.title
        ] !== payload.code
      ) {
        throw new ApiError_1.default(
          http_status_codes_1.StatusCodes.BAD_REQUEST,
          'Invalid Academic Semester Title and Code',
        );
      }
    }
    const findAll = yield AcademicSemester_model_1.academicSemester.find(
      {},
      { title: 1, year: 1, _id: 0 },
    );
    if (
      findAll &&
      typeof findAll === 'object' &&
      Object.keys(findAll).length > 0
    ) {
      if (Array.isArray(findAll) && findAll.length > 0) {
        findAll.forEach((entry) => {
          if (
            entry.title ===
              (payload === null || payload === void 0
                ? void 0
                : payload.title) &&
            entry.year ==
              (payload === null || payload === void 0 ? void 0 : payload.year)
          ) {
            throw new ApiError_1.default(
              http_status_codes_1.StatusCodes.BAD_REQUEST,
              'Academic Semester Already Exist',
            );
          }
        });
      }
    }
    const result =
      yield AcademicSemester_model_1.academicSemester.findByIdAndUpdate(
        id,
        payload,
        {
          new: true,
        },
      );
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        "Couldn't Update Academic Semester",
      );
    }
    return result;
  });
const deleteAcademicSemester = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result =
      yield AcademicSemester_model_1.academicSemester.findByIdAndDelete(id);
    if (!result) {
      throw new ApiError_1.default(
        http_status_codes_1.StatusCodes.NO_CONTENT,
        "Couldn't Delete Academic Semester",
      );
    }
    return result;
  });
exports.AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
