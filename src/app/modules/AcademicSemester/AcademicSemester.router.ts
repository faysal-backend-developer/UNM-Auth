import { Router } from 'express';
import { AcademicSemesterController } from './AcademicSemester.controller';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { AcademicSemesterValidation } from './AcademicSemester.validation';

const router = Router();

router.post(
  '/create',
  validationRequest(AcademicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController.create,
);

router.get('/', AcademicSemesterController.getAllSemester);

router.get('/:id', AcademicSemesterController.getSingleSemester);

router.patch(
  '/:id',
  validationRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester,
);

router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

export const AcademicSemesterRouter = router;
