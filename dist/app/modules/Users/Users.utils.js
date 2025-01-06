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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedAdminId = exports.generatedFacultyId = exports.generatedStudentId = void 0;
const Users_model_1 = require("./Users.model");
/**
export const findLastUserId = async (): Promise<number | undefined> => {
  const lastUserId = await User.findOne()
    .sort({ createdAt: -1 })
    .select({ id: 1 })
    .lean();
  if (lastUserId?.id) {
    const numericPast = Number(lastUserId?.id.split('-')[1]);
    return numericPast;
  } else {
    return 0;
  }
};
export const generatedUserId = async (
  role: string,
): Promise<string | undefined> => {
  const lastUserId = await findLastUserId();
  if (role == 'admin') {
    const newId = `A-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  } else if (role == 'student') {
    const newId = `S-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  } else if (role == 'faculty') {
    const newId = `F-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  }
};
*/
// Generate Student User Ids  : 250100001 [first 2 digits of semester year , 2 digits of semester code and last 5 digits incremental number]
const getLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudent = yield Users_model_1.User.findOne({ role: 'student' }, { id: 1 })
        .sort({
        createdAt: -1,
    })
        .lean();
    if (lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id) {
        const numericNumber = lastStudent === null || lastStudent === void 0 ? void 0 : lastStudent.id.substring(6);
        return Number(numericNumber);
    }
    else {
        return 0;
    }
});
const generatedStudentId = (academicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const lastStudentId = yield getLastStudentId();
    const year = academicSemester && academicSemester.year.substring(2);
    const code = academicSemester && academicSemester.code;
    const newId = `S-${year}${code}${String(lastStudentId + 1).padStart(5, '0')}`;
    return newId;
});
exports.generatedStudentId = generatedStudentId;
// GeneratedFacultyId : F-0001
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = yield Users_model_1.User.findOne({
        role: 'faculty',
    }, { id: 1 })
        .sort({ createdAt: -1 })
        .select({ id: 1 })
        .lean();
    if (lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id) {
        const numericPast = Number(lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id.split('-')[1]);
        return numericPast;
    }
    else {
        return 0;
    }
});
const generatedFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyId = yield findLastFacultyId();
    const newId = `F-${String(lastFacultyId + 1).padStart(5, '0')}`;
    return newId;
});
exports.generatedFacultyId = generatedFacultyId;
// GeneratedAdminId : A-000001
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUserId = yield Users_model_1.User.findOne({
        role: 'admin',
    }, { id: 1 })
        .sort({ createdAt: -1 })
        .select({ id: 1 })
        .lean();
    if (lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id) {
        const numericPast = Number(lastUserId === null || lastUserId === void 0 ? void 0 : lastUserId.id.split('-')[1]);
        return numericPast;
    }
    else {
        return 0;
    }
});
const generatedAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFacultyId = yield findLastAdminId();
    const newId = `A-${String(lastFacultyId + 1).padStart(5, '0')}`;
    return newId;
});
exports.generatedAdminId = generatedAdminId;
