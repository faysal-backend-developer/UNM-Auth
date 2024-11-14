import { IUser } from './users.interface';
import { User } from './users.model';

const create = async (data: IUser): Promise<IUser | null> => {
  const user = await User.create(data);
  if (!user) {
    throw new Error('Could Not Create User');
  } else {
    return user;
  }
};

export const userService = {
  create,
};
