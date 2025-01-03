import { Model } from 'mongoose';
import { IFaculty } from '../Faculty/AcademicFaculty.interface';

export type IDepartment = {
  title: string;
  faculty: string | IFaculty;
};

export type IDepartmentModel = Model<IDepartment, Record<string, unknown>>;
