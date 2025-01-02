import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { FacultyZodValidation } from './Faculty.validation';
import { FacultyController } from './Faculty.controller';

const router = Router();

router.post(
  '/create',
  validationRequest(FacultyZodValidation.facultyZodValidation),
  FacultyController.createFaculty,
);
router.get('/:id', FacultyController.getSingleFaculty);
router.get('/', FacultyController.getAllFaculty);
router.patch(
  '/:id',
  validationRequest(FacultyZodValidation.facultyZodValidation),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRouter = router;
