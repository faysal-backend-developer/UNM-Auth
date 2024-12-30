import { z } from 'zod';
import {
  MonthEnum,
  SemesterCode,
  SemesterTitle,
} from './AcademicSemester.contant';

const academicSemesterZodSchema = z.object({
  body: z.object({
    semester: z.object({
      title: z.enum([...SemesterTitle] as [string, ...string[]], {
        required_error: 'Title is required',
      }),
      year: z.number({
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

export const AcademicSemesterValidation = {
  academicSemesterZodSchema,
};
