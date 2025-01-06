'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AcademicSemesterValidation = void 0;
const zod_1 = require('zod');
const AcademicSemester_constant_1 = require('./AcademicSemester.constant');
const academicSemesterZodSchema = zod_1.z.object({
  body: zod_1.z.object({
    semester: zod_1.z.object({
      title: zod_1.z.enum([...AcademicSemester_constant_1.SemesterTitle], {
        required_error: 'Title is required',
      }),
      year: zod_1.z.string({
        required_error: 'Year is required',
      }),
      code: zod_1.z.enum([...AcademicSemester_constant_1.SemesterCode], {
        required_error: 'Code is required',
      }),
      startMonth: zod_1.z.enum([...AcademicSemester_constant_1.MonthEnum], {
        required_error: 'Start month is required',
      }),
      endMonth: zod_1.z.enum([...AcademicSemester_constant_1.MonthEnum], {
        required_error: 'End month is required',
      }),
    }),
  }),
});
const updateAcademicSemesterZodSchema = zod_1.z
  .object({
    body: zod_1.z.object({
      semester: zod_1.z.object({
        title: zod_1.z
          .enum([...AcademicSemester_constant_1.SemesterTitle])
          .optional(),
        year: zod_1.z.string().optional(),
        code: zod_1.z
          .enum([...AcademicSemester_constant_1.SemesterCode])
          .optional(),
        startMonth: zod_1.z
          .enum([...AcademicSemester_constant_1.MonthEnum])
          .optional(),
        endMonth: zod_1.z
          .enum([...AcademicSemester_constant_1.MonthEnum])
          .optional(),
      }),
    }),
  })
  .refine(
    (data) =>
      ((data === null || data === void 0 ? void 0 : data.body.semester.title) &&
        (data === null || data === void 0
          ? void 0
          : data.body.semester.code)) ||
      (!(data === null || data === void 0
        ? void 0
        : data.body.semester.title) &&
        !(data === null || data === void 0 ? void 0 : data.body.semester.code)),
    {
      message:
        'Either both title and code are required, neither title and code are not required',
    },
  );
exports.AcademicSemesterValidation = {
  academicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
