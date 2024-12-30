import { AcademicSemesterRouter } from '../AcademicSemester/AcademicSemester.router';
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
];

routers.forEach((route) => rootRouter.use(route.path, route.route));

export default rootRouter;
