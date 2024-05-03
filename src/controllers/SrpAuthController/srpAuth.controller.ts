import { Router, Request, Response } from 'express';
import { SrpService } from '../../services/srpService/srp.service';
import { AuthRepository } from '../../services/authService/DAL/auth.repository';

const router = Router();
const srpService = new SrpService();
const authRepository = new AuthRepository();

// Регистрация пользователя с SRP
router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const { salt, verifier } = srpService.createVerifier(username, password);
    const user = await authRepository.createUserWithSrp({
      username,
      email,
      salt,
      verifier,
    });
    res
      .status(201)
      .json({ message: 'User registered with SRP', userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Начало аутентификации SRP
router.post('/init-auth', async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const { salt, serverPublicKey } =
      await srpService.initiateAuthentication(email);
    res.json({ salt, serverPublicKey });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Верификация клиентского доказательства и отправка сессионного ключа
router.post('/verify-proof', async (req: Request, res: Response) => {
  const { email, clientPublicKey, clientProof } = req.body;
  try {
    const { sessionKey } = await srpService.verifyClientProof(
      email,
      clientPublicKey,
      clientProof,
    );
    res.json({ sessionKey });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as srpAuthRouter };
