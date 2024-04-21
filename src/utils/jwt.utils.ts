// В каком-то файле utils/jwt.utils.ts или в сервисе аутентификации.
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key'; // Убедитесь, что устанавливаете секретный ключ в переменных окружения.

export const generateToken = (user: { id: number; email: string; username: string }): string => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    return jwt.sign(payload, secret, { expiresIn: '1h' }); // Токен истекает через 1 час.
};
