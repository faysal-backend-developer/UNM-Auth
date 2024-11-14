import { Router } from 'express';
import usersController from './users.controller';

const userRouter = Router();

userRouter.post('/create', usersController.create);

export default {
  userRouter,
};
