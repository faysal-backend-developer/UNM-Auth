"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../globalErrorHandler/ApiError"));
const AcademicFaculty_model_1 = require("./AcademicFaculty.model");
const dynamicSorting_1 = require("../../Shared/dynamicSorting");
const createAcademicFaculty = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield AcademicFaculty_model_1.academicFaculty.findOne({
        title: payload.title,
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Academic Faculty is already exists');
    }
    const result = yield AcademicFaculty_model_1.academicFaculty.create(payload);
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_ACCEPTABLE, 'Could not create Academic Faculty');
    }
    return result;
});
const getSingleAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AcademicFaculty_model_1.academicFaculty.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic Faculty not found');
    }
    return result;
});
const getAllAcademicFaculty = (paginationOption, searchOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10, sortBy, sortOrder } = paginationOption;
    const skip = (Number(page) - 1) * Number(limit);
    const sortObject = (0, dynamicSorting_1.buildSortObject)(sortBy, sortOrder);
    const andCondition = [];
    if (searchOptions === null || searchOptions === void 0 ? void 0 : searchOptions.searchTerm) {
        andCondition.push({
            $or: [{ title: { $regex: searchOptions.searchTerm, $options: 'i' } }],
        });
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield AcademicFaculty_model_1.academicFaculty
        .find(whereCondition)
        .limit(Number(limit))
        .skip(skip)
        .sort(sortObject);
    const total = yield AcademicFaculty_model_1.academicFaculty.countDocuments();
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic Faculty not found');
    }
    return {
        meta: {
            total,
            limit: Number(limit),
            page: Number(page),
        },
        data: result,
    };
});
const updateAcademicFaculty = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isFind = yield AcademicFaculty_model_1.academicFaculty.findOne({ _id: id });
    if (!isFind) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Can not find Academic faculty');
    }
    const result = yield AcademicFaculty_model_1.academicFaculty.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Can not update Academic faculty');
    }
    return result;
});
const deleteAcademicFaculty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield AcademicFaculty_model_1.academicFaculty.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Can not delete faculty');
    }
    return result;
});
exports.AcademicFacultyService = {
    createAcademicFaculty,
    getSingleAcademicFaculty,
    getAllAcademicFaculty,
    updateAcademicFaculty,
    deleteAcademicFaculty,
};
