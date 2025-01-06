'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.department = void 0;
const mongoose_1 = require('mongoose');
const departmentSchema = new mongoose_1.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Academic Department',
    toJSON: {
      virtuals: true,
    },
  },
);
exports.department = (0, mongoose_1.model)('Department', departmentSchema);
