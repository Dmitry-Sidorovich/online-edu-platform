import { Request, Response, Router } from 'express';
import { GithubAuthService } from '../../services/githubAuthService/githubAuth.service';
import { AuthService } from '../../services/authService/auth.service';

const router = Router();
const githubAuthService = new GithubAuthService();
const authService = new AuthService();

// Редирект пользователя на страницу авторизации GitHub
router.get('/github', (req: Request, res: Response) => {
  const url = githubAuthService.createGithubAuthUrl();
  res.redirect(url);
});

// Callback URL, на который GitHub перенаправит пользователя после аутентификации
router.get('/github/callback', async (req: Request, res: Response) => {
  const { code } = req.query;
  try {
    const accessToken = await githubAuthService.exchangeCodeForToken(
      code as string,
    );
    const userInfo = await githubAuthService.getUserInfo(accessToken);

    // Интеграция пользователя в систему
    const user = await authService.integrateUser({
      id: userInfo.id,
      login: userInfo.login,
      email: userInfo.email,
    });

    const token = githubAuthService.generateToken(user);

    console.log('User integrated successfully:', user.email);
    // res.json({
    //   message: 'Authentication successful',
    //   accessToken,
    //   user,
    // });

    const redirectUrl = `http://localhost:4200/login-jwt?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('Error during GitHub authentication:', error);
    res.status(500).json({
      message: 'Authentication failed',
      error: error.message,
    });
  }
});

export { router as githubAuthRouter };
