import config from '../../../config';
import { IUser } from './Users.interface';
import { User } from './Users.model';
import { generatedUserId } from './Users.utils';

const createUser = async (payload: IUser): Promise<IUser | null> => {
  if (!payload.password) {
    payload.password = config.default_user_password!;
  }

  payload.id = await generatedUserId(payload.role);

  const createdUser = await User.create(payload);

  if (!createdUser) {
    throw new Error('User creation failed');
  }

  return createdUser;
};

export const userService = {
  createUser,
};
