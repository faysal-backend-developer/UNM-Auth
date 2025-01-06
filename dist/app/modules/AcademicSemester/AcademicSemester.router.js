'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterRouter = void 0;
const express_1 = require('express');
const AcademicSemester_controller_1 = require('./AcademicSemester.controller');
const validationRequest_1 = __importDefault(
  require('../../middlewares/validationRequest/validationRequest'),
);
const AcademicSemester_validation_1 = require('./AcademicSemester.validation');
const router = (0, express_1.Router)();
router.post(
  '/create',
  (0, validationRequest_1.default)(
    AcademicSemester_validation_1.AcademicSemesterValidation
      .academicSemesterZodSchema,
  ),
  AcademicSemester_controller_1.AcademicSemesterController.create,
);
router.get(
  '/',
  AcademicSemester_controller_1.AcademicSemesterController.getAllSemester,
);
router.get(
  '/:id',
  AcademicSemester_controller_1.AcademicSemesterController.getSingleSemester,
);
router.patch(
  '/:id',
  (0, validationRequest_1.default)(
    AcademicSemester_validation_1.AcademicSemesterValidation
      .updateAcademicSemesterZodSchema,
  ),
  AcademicSemester_controller_1.AcademicSemesterController
    .updateAcademicSemester,
);
router.delete(
  '/:id',
  AcademicSemester_controller_1.AcademicSemesterController
    .deleteAcademicSemester,
);
exports.AcademicSemesterRouter = router;
