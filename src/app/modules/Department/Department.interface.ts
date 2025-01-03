import { Model } from 'mongoose';
import { IFaculty } from '../Faculty/Faculty.interface';

export type IDepartment = {
  title: string;
  faculty: string | IFaculty;
};

export type IDepartmentModel = Model<IDepartment, Record<string, unknown>>;
