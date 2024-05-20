import { Request, Response, Router } from 'express';
import { ZkpAuthService } from '../../services/zkpAuthService/zkpAuth.service';
import { AuthenticationError, NotFoundError } from '../../utils/errors';

const router: Router = Router();
const zkpAuthService: ZkpAuthService = new ZkpAuthService();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;
    const { token } = await zkpAuthService.register(username, password, email);
    res
      .status(201)
      .json({ message: 'User successfully registered using ZKP.', token });
  } catch (error) {
    res.status(500).send('Error during user registration: ' + error.message);
  }
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const { isValid, token } = await zkpAuthService.authenticate(
      username,
      password,
    );
    if (isValid) {
      res
        .status(200)
        .json({ message: 'User successfully authenticated using ZKP.', token });
    } else {
      res.status(401).send('Authentication error.');
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).send(error.message);
    } else if (error instanceof AuthenticationError) {
      res.status(401).send(error.message);
    } else {
      res.status(500).send('Error authenticating user: ' + error.message);
    }
  }
});

export { router as zkpAuthRouter };
