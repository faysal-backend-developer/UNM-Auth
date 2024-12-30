import { Router } from 'express';
import { userController } from './Users.controller';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { createUserZodSchema } from './User.validation';

const router = Router();

router.post(
  '/create',
  validationRequest(createUserZodSchema),
  userController.createUser,
);

export const userRouter = router;
