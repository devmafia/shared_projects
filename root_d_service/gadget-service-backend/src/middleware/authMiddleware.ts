// src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/user';

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('Token verification error:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    console.log('Token verified successfully:', decoded);
    if (decoded && typeof decoded !== 'string') {
      req.user = {
        email: (decoded as UserPayload).email
      };
    } else {
      req.user = undefined;
    }

    next();
  });
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    //console.log(token + "...exists");
    jwt.verify(token, SECRET_KEY as string, (err, decoded) => {
      if (err) {
        console.log(SECRET_KEY)
        console.log('Token verification error:', err.message);
        return res.status(401).json({ message: 'Invalid token' });
      }
      console.log("Token verified successfully:", decoded);
      req.user = decoded as UserPayload; // Cast decoded to UserPayload
      next();
    });
  } catch (error: any) {
    console.log('Unexpected error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
