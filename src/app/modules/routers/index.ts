import { AcademicSemesterRouter } from '../AcademicSemester/AcademicSemester.router';
import { DepartmentRouter } from '../Department/Department.router';
import { FacultyRouter } from '../Faculty/Faculty.router';
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
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/department',
    route: DepartmentRouter,
  },
];

routers.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
