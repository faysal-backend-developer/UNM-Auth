import { z } from 'zod';

const createDepartment = z.object({
  body: z.object({
    department: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      faculty: z.string({
        required_error: 'Faculty is required',
      }),
    }),
  }),
});

const updateDepartment = z.object({
  body: z.object({
    department: z.object({
      title: z.string().optional(),
      faculty: z.string().optional(),
    }),
  }),
});

export const DepartmentZodSchema = {
  createDepartment,
  updateDepartment,
};
