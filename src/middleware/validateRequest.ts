import { Request, Response, NextFunction } from 'express';

export const validateRegistration = (req: Request, res: Response, next: NextFunction): void => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'Please provide username, email, and password' });
        return; // Убедитесь, что функция завершает выполнение после отправки ответа
    }
    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide email and password' });
        return; // Убедитесь, что функция завершает выполнение после отправки ответа
    }
    next();
};
