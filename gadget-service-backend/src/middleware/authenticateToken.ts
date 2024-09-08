// src/middleware/authenticateToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserPayload } from '../types/user';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, SECRET_KEY, (err, user: JwtPayload | string | undefined) => {
    if (err) return res.sendStatus(403); // Forbidden

    // Ensure that `user` is of type `UserPayload` if it's not a `string`
    if (typeof user !== 'string') {
      req.user = user as UserPayload;
    } else {
      req.user = undefined;
    }

    next();
  });
};
