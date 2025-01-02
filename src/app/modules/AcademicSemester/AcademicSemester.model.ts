import { model, Schema } from 'mongoose';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './AcademicSemester.interface';
import {
  MonthEnum,
  SemesterCode,
  SemesterTitle,
} from './AcademicSemester.constant';
import ApiError from '../../globalErrorHandler/ApiError';
import { StatusCodes } from 'http-status-codes';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: SemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: MonthEnum,
    },
    endMonth: {
      type: String,
      required: true,
      enum: MonthEnum,
    },
  },
  {
    timestamps: true,
    virtuals: true,
    collection: 'Academic Semester',
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await academicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(StatusCodes.CONFLICT, 'Semester already exists');
  }

  next();
});

export const academicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('Academic Semester', academicSemesterSchema);
