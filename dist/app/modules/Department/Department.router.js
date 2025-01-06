'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.DepartmentRouter = void 0;
const express_1 = require('express');
const Department_controller_1 = require('./Department.controller');
const validationRequest_1 = __importDefault(
  require('../../middlewares/validationRequest/validationRequest'),
);
const Department_validation_1 = require('./Department.validation');
const router = (0, express_1.Router)();
router.post(
  '/create',
  (0, validationRequest_1.default)(
    Department_validation_1.DepartmentZodSchema.createDepartment,
  ),
  Department_controller_1.DepartmentController.createDepartment,
);
router.get(
  '/:id',
  Department_controller_1.DepartmentController.readSingleDepartment,
);
router.patch(
  '/:id',
  (0, validationRequest_1.default)(
    Department_validation_1.DepartmentZodSchema.updateDepartment,
  ),
  Department_controller_1.DepartmentController.updateDepartment,
);
router.delete(
  '/:id',
  Department_controller_1.DepartmentController.deleteDepartment,
);
router.get('/', Department_controller_1.DepartmentController.readDepartment);
exports.DepartmentRouter = router;
