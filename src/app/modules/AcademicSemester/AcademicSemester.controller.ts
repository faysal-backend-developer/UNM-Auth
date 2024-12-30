import { RequestHandler } from 'express';
import { AcademicSemesterService } from './AcademicSemester.service';

const create: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { semester } = req.body;
    const create = await AcademicSemesterService.createSemester(semester);
    res.status(200).send({
      success: true,
      message: 'Academic Semester Created Successfully',
      data: create,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  create,
};
