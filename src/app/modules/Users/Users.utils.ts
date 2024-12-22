import { User } from './Users.model';

export const findLastUserId = async (): Promise<number | undefined> => {
  const lastUserId = await User.findOne()
    .sort({ createdAt: -1 })
    .select({ id: 1 })
    .lean();
  if (lastUserId?.id) {
    const numericPast = Number(lastUserId?.id.split('-')[1]);
    return numericPast;
  } else {
    return 0;
  }
};
export const generatedUserId = async (
  role: string,
): Promise<string | undefined> => {
  const lastUserId = await findLastUserId();
  if (role == 'admin') {
    const newId = `A-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  } else if (role == 'student') {
    const newId = `S-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  } else if (role == 'faculty') {
    const newId = `F-${String(lastUserId! + 1).padStart(5, '0')}`;
    return newId;
  }
};
