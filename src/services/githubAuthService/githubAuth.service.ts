import axios from 'axios';
import jwt from 'jsonwebtoken';

export class GithubAuthService {
  private clientId = process.env.GITHUB_CLIENT_ID;
  private clientSecret = process.env.GITHUB_CLIENT_SECRET;
  private redirectUri = 'http://localhost:3001/api/github-auth/github/callback';

  public createGithubAuthUrl(): string {
    const base = 'https://github.com/login/oauth/authorize';
    const params = `?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=read:user`;
    return `${base}${params}`;
  }

  public async exchangeCodeForToken(code: string): Promise<string> {
    try {
      const url = 'https://github.com/login/oauth/access_token';
      const values = {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
      };
      const response = await axios.post(url, values, {
        headers: { Accept: 'application/json' },
      });
      console.log('Token response:', response.data);
      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error.response.data);
      throw error;
    }
  }

  public async getUserInfo(token: string) {
    try {
      const response = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data; // Возвращает данные пользователя GitHub
    } catch (error) {
      console.error('Error fetching user data:', error.response.data);
      throw error;
    }
  }

  public generateToken(user: any): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in .env file');
    }
    const jwtSecret = process.env.JWT_SECRET;

    const token: string = jwt.sign(
      { id: user.id, username: user.login, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: '1h' },
    );
    return token;
  }
}
