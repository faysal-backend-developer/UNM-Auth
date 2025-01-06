'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.DepartmentZodSchema = void 0;
const zod_1 = require('zod');
const createDepartment = zod_1.z.object({
  body: zod_1.z.object({
    department: zod_1.z.object({
      title: zod_1.z.string({
        required_error: 'Title is required',
      }),
      academicFaculty: zod_1.z.string({
        required_error: 'Academic Faculty is required',
      }),
    }),
  }),
});
const updateDepartment = zod_1.z.object({
  body: zod_1.z.object({
    department: zod_1.z.object({
      title: zod_1.z.string().optional(),
      academicFaculty: zod_1.z.string().optional(),
    }),
  }),
});
exports.DepartmentZodSchema = {
  createDepartment,
  updateDepartment,
};
