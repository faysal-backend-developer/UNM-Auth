import { Router } from 'express';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { AcademicFacultyZodValidation } from './AcademicFaculty.validation';
import { AcademicFacultyController } from './AcademicFaculty.controller';

const router = Router();

router.post(
  '/create',
  validationRequest(AcademicFacultyZodValidation.academicFacultyZodValidation),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);
router.patch(
  '/:id',
  validationRequest(AcademicFacultyZodValidation.academicFacultyZodValidation),
  AcademicFacultyController.updateAcademicFaculty,
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);

export const AcademicFacultyRouter = router;
