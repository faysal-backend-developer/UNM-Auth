import { z } from 'zod';

const academicFacultyZodValidation = z.object({
  body: z.object({
    faculty: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
    }),
  }),
});

export const AcademicFacultyZodValidation = {
  academicFacultyZodValidation,
};
