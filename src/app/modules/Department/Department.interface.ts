import { Model } from 'mongoose';
import { IAcademicFaculty } from '../Faculty/AcademicFaculty.interface';

export type IDepartment = {
  title: string;
  academicFaculty: string | IAcademicFaculty;
};

export type IDepartmentModel = Model<IDepartment, Record<string, unknown>>;
