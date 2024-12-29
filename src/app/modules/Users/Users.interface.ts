import { Model } from 'mongoose';

export type IUser = {
  id: string | undefined;
  role: string;
  password: string;
};

// Type of Model
export type UserModel = Model<IUser, Record<string, unknown>>;
