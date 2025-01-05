import { model, Schema } from 'mongoose';
import { IDepartment, IDepartmentModel } from './Department.interface';

const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Academic Department',
    toJSON: {
      virtuals: true,
    },
  },
);

export const department = model<IDepartment, IDepartmentModel>(
  'Department',
  departmentSchema,
);
