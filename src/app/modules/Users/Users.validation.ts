import { z } from 'zod';

export const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB', 'O+', 'O-']),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string({
          required_error: 'Mother name is required',
        }),
        motherContactNo: z.string().optional(),
        motherOccupation: z.string().optional(),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is required',
        }),
        contactNo: z.string({
          required_error: 'Contact number is required',
        }),
        occupation: z.string({
          required_error: 'Occupation is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
        relations: z.string({
          required_error: 'Relation is required',
        }),
      }),
      profileImage: z
        .string({
          required_error: 'Profile image is required',
        })
        .optional(),
      academicSemester: z.string({
        required_error: 'Academic semester is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});
