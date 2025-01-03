import { AcademicSemesterRouter } from '../AcademicSemester/AcademicSemester.router';
import { DepartmentRouter } from '../Department/Department.router';
import { AcademicFacultyRouter } from '../Faculty/AcademicFaculty.router';
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
];

routers.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
