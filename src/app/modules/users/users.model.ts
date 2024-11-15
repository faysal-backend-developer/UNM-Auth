import { model, Schema } from 'mongoose';
import { IUser } from './users.interface';

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model<IUser>('User', userSchema);
