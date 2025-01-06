import { Router } from 'express';
import { StudentController } from './Student.controller';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { updateStudentZodSchema } from './Student.validation';

const router = Router();

router.get('/', StudentController.getAllStudent);
router.get('/:id', StudentController.getSingleStudent);
router.patch(
  '/:id',
  validationRequest(updateStudentZodSchema),
  StudentController.updateStudent,
);
router.delete('/:id', StudentController.deleteStudent);

export const StudentRouter = router;
