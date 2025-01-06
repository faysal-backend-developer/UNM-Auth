'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.userRouter = void 0;
const express_1 = require('express');
const Users_controller_1 = require('./Users.controller');
const validationRequest_1 = __importDefault(
  require('../../middlewares/validationRequest/validationRequest'),
);
const Users_validation_1 = require('./Users.validation');
const router = (0, express_1.Router)();
router.post(
  '/create-student',
  (0, validationRequest_1.default)(Users_validation_1.createStudentZodSchema),
  Users_controller_1.userController.createStudent,
);
exports.userRouter = router;
