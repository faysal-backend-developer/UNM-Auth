import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/Student.interface';

export type IUser = {
  id: string | undefined;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  // faculty?: Types.ObjectId | IFaculty;
  // admin?: Types.ObjectId | IAdmin;
};

// Type of Model
export type UserModel = Model<IUser, Record<string, unknown>>;
