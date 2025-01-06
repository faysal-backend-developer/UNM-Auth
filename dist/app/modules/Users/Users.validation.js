"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentZodSchema = void 0;
const zod_1 = require("zod");
exports.createStudentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required',
                }),
                middleName: zod_1.z.string().optional(),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required',
                }),
            }),
            gender: zod_1.z.enum(['male', 'female']).optional(),
            dateOfBirth: zod_1.z.string().optional(),
            bloodGroup: zod_1.z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB', 'O+', 'O-']),
            email: zod_1.z
                .string({
                required_error: 'Email is required',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact number is required',
            }),
            presentAddress: zod_1.z.string({
                required_error: 'Present address is required',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'Permanent address is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required',
                }),
                fatherOccupation: zod_1.z.string().optional(),
                fatherContactNo: zod_1.z.string().optional(),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required',
                }),
                motherContactNo: zod_1.z.string().optional(),
                motherOccupation: zod_1.z.string().optional(),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Name is required',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Contact number is required',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Occupation is required',
                }),
                address: zod_1.z.string({
                    required_error: 'Address is required',
                }),
                relations: zod_1.z.string({
                    required_error: 'Relation is required',
                }),
            }),
            profileImage: zod_1.z
                .string({
                required_error: 'Profile image is required',
            })
                .optional(),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
        }),
    }),
});
