"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRouter = void 0;
const express_1 = require("express");
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest/validationRequest"));
const AcademicFaculty_validation_1 = require("./AcademicFaculty.validation");
const AcademicFaculty_controller_1 = require("./AcademicFaculty.controller");
const router = (0, express_1.Router)();
router.post('/create', (0, validationRequest_1.default)(AcademicFaculty_validation_1.AcademicFacultyZodValidation.academicFacultyZodValidation), AcademicFaculty_controller_1.AcademicFacultyController.createAcademicFaculty);
router.get('/:id', AcademicFaculty_controller_1.AcademicFacultyController.getSingleAcademicFaculty);
router.get('/', AcademicFaculty_controller_1.AcademicFacultyController.getAllAcademicFaculty);
router.patch('/:id', (0, validationRequest_1.default)(AcademicFaculty_validation_1.AcademicFacultyZodValidation.academicFacultyZodValidation), AcademicFaculty_controller_1.AcademicFacultyController.updateAcademicFaculty);
router.delete('/:id', AcademicFaculty_controller_1.AcademicFacultyController.deleteAcademicFaculty);
exports.AcademicFacultyRouter = router;
