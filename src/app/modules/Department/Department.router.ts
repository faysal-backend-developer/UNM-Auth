import { Router } from 'express';
import { DepartmentController } from './Department.controller';
import validationRequest from '../../middlewares/validationRequest/validationRequest';
import { DepartmentZodSchema } from './Department.validation';

const router = Router();

router.post(
  '/create',
  validationRequest(DepartmentZodSchema.createDepartment),
  DepartmentController.createDepartment,
);
router.get('/:id', DepartmentController.readSingleDepartment);
router.patch(
  '/:id',
  validationRequest(DepartmentZodSchema.updateDepartment),
  DepartmentController.updateDepartment,
);
router.delete('/:id', DepartmentController.deleteDepartment);
router.get('/', DepartmentController.readDepartment);

export const DepartmentRouter = router;
