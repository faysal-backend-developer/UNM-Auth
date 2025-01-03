import { model, Schema } from 'mongoose';
import { IDepartment, IDepartmentModel } from './Department.interface';

const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const department = model<IDepartment, IDepartmentModel>(
  'Department',
  departmentSchema,
);
