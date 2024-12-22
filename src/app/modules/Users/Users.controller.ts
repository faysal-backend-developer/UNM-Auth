import { NextFunction, Request, Response } from 'express';
import { userService } from './Users.service';

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.body.user;
    const result = await userService.createUser(user);
    res.send({
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createUser,
};
