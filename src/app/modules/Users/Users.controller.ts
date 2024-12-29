import { RequestHandler } from 'express';
import { userService } from './Users.service';

const createUser: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const { user } = req.body;
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
