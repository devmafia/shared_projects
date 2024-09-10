// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateFields = (fields: string[]) => {
  console.log("pass_1_v")
  return (req: Request, res: Response, next: NextFunction) => {
    console.log("pass_2_v")
    try {
      const errors = fields.filter(field => !req.body[field]);
      console.log("pass_3_v")
      if (errors.length > 0) {
        return res.status(400).json({ message: `Missing fields: ${errors.join(', ')}` });
      }
    } catch (error: any) {
      console.log(error)
    }
    next();
  };
};
