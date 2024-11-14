import { Request, Response } from 'express';
import { userService } from './users.services';

const create = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    console.log(data);
    if (!data) {
      return res.status(400).json({ message: 'Data is required' });
    } else {
      const result = await userService.create(data);
      res.status(200).json({
        message: 'User created successfully',
        result: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export default {
  create,
};
