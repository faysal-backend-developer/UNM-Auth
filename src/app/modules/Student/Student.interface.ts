import { Model, Types } from 'mongoose';

import { IAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { IAcademicFaculty } from '../Faculty/AcademicFaculty.interface';
import { IDepartment } from '../Department/Department.interface';

type IBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB' | 'O+' | 'O-';

type IGender = 'male' | 'female';

type IFullName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

type IGuardian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  address: string;
};

type ILocalGuardian = {
  required: true;
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
  relations: string;
};

export type IStudent = {
  id: string;
  name: IFullName;
  gender: IGender;
  dateOfBirth: string;
  bloodGroup?: IBloodGroup;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage?: string;
  academicSemester: Types.ObjectId | IAcademicSemester;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
  academicDepartment: Types.ObjectId | IDepartment;
};
export type StudentModel = Model<IStudent, Record<string, unknown>>;

export type IFilterableFields = {
  searchTerm?: string;
  bloodGroup?: string;
  id?: string;
  email?: string;
  emergencyContactNo?: string;
  contactNo?: string;
  gender?: string;
};
