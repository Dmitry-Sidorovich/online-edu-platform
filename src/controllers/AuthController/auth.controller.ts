import * as express from 'express';
import { Response } from 'express';
import { AuthService } from '../../services/authService/auth.service';
import { loginSchema, registrationSchema } from './auth.controller.schemas';
import { expressJoiMiddleware } from '../../middlewares/ExpressJoiMiddleware/express-joi.middleware';
import { authMiddleware } from '../../middlewares/authMiddleware';
import {
  DeleteUserRequest,
  LoginRequest,
  RegistrationRequest,
} from './auth.controller.interface';
import { roleMiddleware } from '../../middlewares/roleMiddleware';

const router = express.Router();
const authService: AuthService = new AuthService();

router.post(
  '/register',
  expressJoiMiddleware.body(registrationSchema),
  async (req: RegistrationRequest, res: Response) => {
    const { username, email, password } = req.body;
    try {
      const { user, token } = await authService.register({
        username,
        email,
        password,
      });
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

router.post(
  '/login',
  expressJoiMiddleware.body(loginSchema),
  async (req: LoginRequest, res: Response) => {
    const { email, password } = req.body;
    try {
      const token = await authService.login({ email, password });
      if (!token) res.status(401).json({ message: 'Authentication failed' });
      else res.status(200).json({ token });
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

router.delete(
  '/user/:id',
  authMiddleware,
  roleMiddleware(['admin', 'teacher']),
  async (req: DeleteUserRequest, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
      const isDeleted = await authService.deleteUser(userId);
      if (!isDeleted) res.status(404).json({ message: 'User not found' });
      else res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
);

export { router as authRouter };
