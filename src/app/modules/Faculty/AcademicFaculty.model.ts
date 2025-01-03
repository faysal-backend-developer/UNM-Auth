import { model, Schema } from 'mongoose';
import { IAcademicFaculty } from './AcademicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'AcademicFaculty',
    toJSON: {
      virtuals: true,
    },
  },
);

export const academicFaculty = model<IAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
