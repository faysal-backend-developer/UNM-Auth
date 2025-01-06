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
exports.userService = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../globalErrorHandler/ApiError"));
const Users_utils_1 = require("./Users.utils");
const AcademicSemester_model_1 = require("../AcademicSemester/AcademicSemester.model");
const mongoose_1 = __importDefault(require("mongoose"));
const Student_model_1 = require("../Student/Student.model");
const Users_model_1 = require("./Users.model");
const createStudent = (studentData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData.password) {
        userData.password = config_1.default.default_Student_password;
    }
    userData.role = 'student';
    const academicSemesterId = yield AcademicSemester_model_1.academicSemester.findById({
        _id: studentData.academicSemester,
    });
    if (!academicSemesterId) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Academic Semester not Founded, Please Enter Valid Academic Semester');
    }
    const session = yield mongoose_1.default.startSession();
    let allUserData = null;
    try {
        session.startTransaction();
        const id = yield (0, Users_utils_1.generatedStudentId)(academicSemesterId);
        userData.id = id;
        studentData.id = id;
        const createStudent = yield Student_model_1.student.create([studentData], { session });
        if (!createStudent.length) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Couldn't create student");
        }
        allUserData = createStudent[0];
        userData.student = createStudent[0]._id;
        const createUser = yield Users_model_1.User.create([userData], { session });
        if (!createUser.length) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Couldn't create user");
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (allUserData) {
        allUserData = yield Users_model_1.User.findOne({ id: allUserData.id }).populate({
            path: 'student',
            populate: [
                { path: 'academicSemester' },
                { path: 'academicDepartment' },
                { path: 'academicFaculty' },
            ],
        });
    }
    return allUserData;
});
exports.userService = {
    createStudent,
};
