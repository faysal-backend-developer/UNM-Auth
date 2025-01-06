'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicFaculty = void 0;
const mongoose_1 = require('mongoose');
const academicFacultySchema = new mongoose_1.Schema(
  {
    title: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Academic Faculty',
    toJSON: {
      virtuals: true,
    },
  },
);
exports.academicFaculty = (0, mongoose_1.model)(
  'AcademicFaculty',
  academicFacultySchema,
);
