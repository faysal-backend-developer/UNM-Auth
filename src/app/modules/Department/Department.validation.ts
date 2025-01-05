import { z } from 'zod';

const createDepartment = z.object({
  body: z.object({
    department: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
    }),
  }),
});

const updateDepartment = z.object({
  body: z.object({
    department: z.object({
      title: z.string().optional(),
      academicFaculty: z.string().optional(),
    }),
  }),
});

export const DepartmentZodSchema = {
  createDepartment,
  updateDepartment,
};
