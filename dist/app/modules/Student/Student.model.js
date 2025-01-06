'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.student = exports.studentSchema = void 0;
const mongoose_1 = require('mongoose');
const Student_constants_1 = require('./Student.constants');
exports.studentSchema = new mongoose_1.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    gender: {
      type: String,
      enum: Student_constants_1.gender,
    },
    dateOfBirth: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: Student_constants_1.bloodGroup,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    guardian: {
      fatherName: {
        type: String,
        required: true,
      },
      fatherContactNo: {
        type: String,
      },
      fatherOccupation: {
        type: String,
      },
      motherName: {
        type: String,
        required: true,
      },
      motherContactNo: {
        type: String,
      },
      motherOccupation: {
        type: String,
      },
      address: {
        type: String,
        required: true,
      },
    },
    localGuardian: {
      name: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      occupation: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      relations: {
        type: String,
        required: true,
      },
    },
    profileImage: {
      type: String,
    },
    academicSemester: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    collection: 'Student',
  },
);
exports.student = (0, mongoose_1.model)('Student', exports.studentSchema);
