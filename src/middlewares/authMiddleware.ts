// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Users } from '../models/users.model';

export interface RequestWithUser extends Request {
  user?: JwtPayload & { id: number; role: string };
}

export const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Access denied. No token provided.' });
    return;
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in .env file');
  }
  const jwtSecret = process.env.JWT_SECRET;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload & {
      id: number;
      role: string;
    };

    // Дополнительно проверяем, существует ли пользователь
    const user = await Users.findByPk(decoded.id);
    if (!user) {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }

    // Проверяем, соответствует ли роль в токене роли в базе данных
    if (user.role !== decoded.role) {
      res.status(401).json({ message: 'Invalid token.' });
      return;
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.', error: error.message });
  }
};
