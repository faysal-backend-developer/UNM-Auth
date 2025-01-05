import { Router } from 'express';
import { StudentController } from './Student.controller';

const router = Router();

router.get('/', StudentController.getAllStudent);

export const StudentRouter = router;
