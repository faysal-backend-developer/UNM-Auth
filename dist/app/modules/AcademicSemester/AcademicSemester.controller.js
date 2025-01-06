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
exports.AcademicSemesterController = void 0;
const AcademicSemester_service_1 = require("./AcademicSemester.service");
const catchAsync_1 = __importDefault(require("../../Shared/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const requestHandler_1 = __importDefault(require("../../Shared/requestHandler"));
const pick_1 = __importDefault(require("../../Shared/pick"));
// !: Create Academic Semester
const create = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { semester } = req.body;
    const create = yield AcademicSemester_service_1.AcademicSemesterService.createSemester(semester);
    (0, requestHandler_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Semester created successfully',
        data: create,
    });
}));
// ! : Get All Semester
const getAllSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filterableFields = (0, pick_1.default)(req.query, ['searchTerm', 'year', 'title']);
    // console.log(filterableFields)
    const paginationOptions = (0, pick_1.default)(req.query, [
        'page',
        'limit',
        'sortBy',
        'sortOrder',
    ]);
    const result = yield AcademicSemester_service_1.AcademicSemesterService.getAllSemester(paginationOptions, filterableFields);
    (0, requestHandler_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'All Semesters Find successfully',
        data: result.data,
        meta: result.meta,
    });
}));
// ! : Get single Semester
const getSingleSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield AcademicSemester_service_1.AcademicSemesterService.getSingleSemester(id);
    (0, requestHandler_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Semester Find successfully',
        data: result,
    });
}));
// ! : Update Academic Semester
const updateAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { semester } = req.body;
    const result = yield AcademicSemester_service_1.AcademicSemesterService.updateAcademicSemester(id, semester);
    (0, requestHandler_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Semester Update successfully',
        data: result,
    });
}));
// ! : Delete Academic Semester
const deleteAcademicSemester = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield AcademicSemester_service_1.AcademicSemesterService.deleteAcademicSemester(id);
    (0, requestHandler_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Academic Semester Delete successfully',
        data: result,
    });
}));
exports.AcademicSemesterController = {
    create,
    getAllSemester,
    getSingleSemester,
    updateAcademicSemester,
    deleteAcademicSemester,
};
