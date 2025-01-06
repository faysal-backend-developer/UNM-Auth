import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import ApiError from '../../globalErrorHandler/ApiError';
import { IUser } from './Users.interface';
import { IStudent } from '../Student/Student.interface';
import { generatedStudentId } from './Users.utils';
import { academicSemester } from '../AcademicSemester/AcademicSemester.model';
import mongoose from 'mongoose';
import { student } from '../Student/Student.model';
import { User } from './Users.model';

const createStudent = async (
  studentData: IStudent,
  userData: Partial<IUser>,
) => {
  if (!userData.password) {
    userData.password = config.default_Student_password!;
  }
  userData.role = 'student';
  const academicSemesterId = await academicSemester.findById({
    _id: studentData.academicSemester,
  });

  if (!academicSemesterId) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      'Academic Semester not Founded, Please Enter Valid Academic Semester',
    );
  }

  const session = await mongoose.startSession();

  let allUserData = null;
  try {
    session.startTransaction();
    const id = await generatedStudentId(academicSemesterId);
    userData.id = id;
    studentData.id = id;
    const createStudent = await student.create([studentData], { session });

    if (!createStudent.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Couldn't create student");
    }

    allUserData = createStudent[0];
    userData.student = createStudent[0]._id;
    const createUser = await User.create([userData], { session });

    if (!createUser.length) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Couldn't create user");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (allUserData) {
    allUserData = await User.findOne({ id: allUserData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return allUserData;
};

export const userService = {
  createStudent,
};
