import { model, Schema } from 'mongoose';
import { IFaculty } from './Faculty.interface';

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'Faculty',
    toJSON: {
      virtuals: true,
    },
  },
);

export const faculty = model<IFaculty>('Faculty', facultySchema);
