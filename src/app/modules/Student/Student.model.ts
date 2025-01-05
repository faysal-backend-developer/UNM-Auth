import { model, Schema } from 'mongoose';
import { IStudent, StudentModel } from './Student.interface';
import { bloodGroup, gender } from './Student.constants';

export const studentSchema = new Schema<IStudent>(
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
      enum: gender,
    },
    dateOfBirth: {
      type: String,
    },
    bloodGroup: {
      type: String,
      enum: bloodGroup,
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
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
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

export const student = model<IStudent, StudentModel>('Student', studentSchema);
