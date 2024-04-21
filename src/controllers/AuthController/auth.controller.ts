import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import { generateToken } from '../../utils/jwt.utils';
import {UserService} from "../../services/userService/user.service";
import {authMiddleware} from "../../middleware/authMiddleware";

const router = express.Router();
const userService = new UserService();

// Middleware для валидации запроса на регистрацию
export const registrationValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required (username, email, password)' });
        return; // Добавлен return для завершения функции
    }
    next();
};

// Middleware для валидации запроса на аутентификацию
export const loginValidationMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Both email and password are required' });
        return; // Добавлен return для завершения функции
    }
    next();
};

router.post('/register', registrationValidationMiddleware, async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
        const user = await userService.registerUser(username, email, password);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', loginValidationMiddleware, async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await userService.authenticateUser(email, password);
        if (!user) {
            res.status(401).json({ message: 'Authentication failed' });
            return; // Обеспечивает выход из функции
        }
        const token = generateToken(user);
        res.status(200).json({ message: 'Authenticated successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/protected-route', authMiddleware, (req: Request, res: Response) => {
    // Теперь этот маршрут доступен только аутентифицированным пользователям
    res.json({ message: 'Это защищенный маршрут, и вы аутентифицированы!' });
});

router.delete('/user/:id', async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.id);
    try {
        const isDeleted = await userService.deleteUser(userId);
        if (!isDeleted) {
            res.status(404).json({ message: 'User not found' });
            return; // Обеспечивает выход из функции
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export { router as authRouter };