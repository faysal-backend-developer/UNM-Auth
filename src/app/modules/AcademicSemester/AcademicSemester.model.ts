import { model, Schema } from 'mongoose';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './AcademicSemester.interface';
import {
  MonthEnum,
  SemesterCode,
  SemesterTitle,
} from './AcademicSemester.contant';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: SemesterTitle,
    },
    year: {
      type: Number,
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

export const academicSemester = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('Academic Semester', academicSemesterSchema);
