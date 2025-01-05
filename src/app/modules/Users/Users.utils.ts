import { IAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { User } from './Users.model';
/**  
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
*/

// Generate Student User Ids  : 250100001 [first 2 digits of semester year , 2 digits of semester code and last 5 digits incremental number]
const getLastStudentId = async (): Promise<number> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1 })
    .sort({
      createdAt: -1,
    })
    .lean();

  if (lastStudent?.id) {
    const numericNumber = lastStudent?.id.substring(6);
    return Number(numericNumber);
  } else {
    return 0;
  }
};

export const generatedStudentId = async (
  academicSemester: IAcademicSemester | null,
) => {
  const lastStudentId = await getLastStudentId();
  const year = academicSemester && academicSemester.year.substring(2);
  const code = academicSemester && academicSemester.code;
  const newId = `S-${year}${code}${String(lastStudentId + 1).padStart(5, '0')}`;
  return newId;
};

// GeneratedFacultyId : F-0001

const findLastFacultyId = async (): Promise<number | undefined> => {
  const lastUserId = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1 },
  )
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

export const generatedFacultyId = async () => {
  const lastFacultyId = await findLastFacultyId();
  const newId = `F-${String(lastFacultyId! + 1).padStart(5, '0')}`;
  return newId;
};

// GeneratedAdminId : A-000001
const findLastAdminId = async (): Promise<number | undefined> => {
  const lastUserId = await User.findOne(
    {
      role: 'admin',
    },
    { id: 1 },
  )
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

export const generatedAdminId = async () => {
  const lastFacultyId = await findLastAdminId();
  const newId = `A-${String(lastFacultyId! + 1).padStart(5, '0')}`;
  return newId;
};
