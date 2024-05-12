import { Request, Response, Router } from 'express';
import { ZkpAuthService } from '../../services/zkpAuthService/zkpAuth.service';

const router = Router();
const zkpAuthService = new ZkpAuthService();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    await zkpAuthService.register(username, password);
    res.status(201).send('User registered successfully with ZKP.');
  } catch (error) {
    res.status(500).send('Error registering user: ' + error.message);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const isValid = await zkpAuthService.authenticate(username, password);
    if (isValid) {
      res.status(200).send('User authenticated successfully with ZKP.');
    } else {
      res.status(401).send('Authentication failed.');
    }
  } catch (error) {
    res.status(500).send('Error authenticating user: ' + error.message);
  }
});

export { router as zkpAuthRouter };
