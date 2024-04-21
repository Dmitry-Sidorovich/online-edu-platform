import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return; // Завершение функции после отправки ответа
    }

    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user; // Добавьте соответствующий тип в Request в вашем типе определения Express
        next(); // Передача управления следующему middleware
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
        return; // Завершение функции после отправки ответа
    }
};
