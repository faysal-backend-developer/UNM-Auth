import { AcademicSemesterRouter } from '../AcademicSemester/AcademicSemester.router';
import { DepartmentRouter } from '../Department/Department.router';
import { AcademicFacultyRouter } from '../Faculty/AcademicFaculty.router';
import { StudentRouter } from '../Student/Student.router';
import { userRouter } from '../Users/Users.routers';
import { Router } from 'express';

const rootRouter = Router();

const routers = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/academicSemester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academicFaculty',
    route: AcademicFacultyRouter,
  },
  {
    path: '/department',
    route: DepartmentRouter,
  },
  {
    path: '/student',
    route: StudentRouter,
  },
];

routers.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
