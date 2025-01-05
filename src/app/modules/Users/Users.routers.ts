import { Router } from 'express';
import { userController } from './Users.controller';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { createStudentZodSchema } from './Users.validation';

const router = Router();

router.post(
  '/create-student',
  validationRequest(createStudentZodSchema),
  userController.createStudent,
);

export const userRouter = router;
