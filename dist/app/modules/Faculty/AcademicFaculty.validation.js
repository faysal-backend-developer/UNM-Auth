'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicFacultyZodValidation = void 0;
const zod_1 = require('zod');
const academicFacultyZodValidation = zod_1.z.object({
  body: zod_1.z.object({
    faculty: zod_1.z.object({
      title: zod_1.z.string({
        required_error: 'Title is required',
      }),
    }),
  }),
});
exports.AcademicFacultyZodValidation = {
  academicFacultyZodValidation,
};
