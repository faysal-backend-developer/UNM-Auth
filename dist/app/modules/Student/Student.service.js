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
exports.StudentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../globalErrorHandler/ApiError"));
const Student_model_1 = require("./Student.model");
const getallStudent = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Student_model_1.student.find();
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Student not found');
    }
    return result;
});
const getSingleStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Student_model_1.student.findById({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Student not found');
    }
    ;
    return result;
});
const updateStudent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Student_model_1.student.findByIdAndUpdate({
        _id: id
    }, payload, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Student not found');
    }
    return result;
});
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Student_model_1.student.findByIdAndDelete({
        _id: id
    });
    if (!result) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NO_CONTENT, 'Student not found');
    }
    ;
    return result;
});
exports.StudentService = {
    getallStudent,
    getSingleStudent,
    updateStudent,
    deleteStudent
};
