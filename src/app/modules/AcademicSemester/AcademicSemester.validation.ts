import { z } from 'zod';
import {
  MonthEnum,
  SemesterCode,
  SemesterTitle,
} from './AcademicSemester.constant';

const academicSemesterZodSchema = z.object({
  body: z.object({
    semester: z.object({
      title: z.enum([...SemesterTitle] as [string, ...string[]], {
        required_error: 'Title is required',
      }),
      year: z.string({
        required_error: 'Year is required',
      }),
      code: z.enum([...SemesterCode] as [string, ...string[]], {
        required_error: 'Code is required',
      }),
      startMonth: z.enum([...MonthEnum] as [string, ...string[]], {
        required_error: 'Start month is required',
      }),
      endMonth: z.enum([...MonthEnum] as [string, ...string[]], {
        required_error: 'End month is required',
      }),
    }),
  }),
});

const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    semester: z.object({
      title: z.enum([...SemesterTitle] as [string, ...string[]]).optional(),
      year: z.string().optional(),
      code: z.enum([...SemesterCode] as [string, ...string[]]).optional(),
      startMonth: z.enum([...MonthEnum] as [string, ...string[]]).optional(),
      endMonth: z.enum([...MonthEnum] as [string, ...string[]]).optional(),
    }),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
