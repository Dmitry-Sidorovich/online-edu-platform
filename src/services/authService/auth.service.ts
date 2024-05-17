import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './DAL/auth.repository';
import { Users } from '../../models/users.model';
import { UserLoginData, UserRegistrationData } from './auth.service.interface';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async register(userData: UserRegistrationData): Promise<Users> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return this.authRepository.createUser({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
    });
  }

  public async login(userData: UserLoginData): Promise<string | null> {
    const user: Users = await this.authRepository.findUserByEmail(
      userData.email,
    );
    if (!user) return null;

    const isMatch: boolean = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!isMatch) return null;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in .env file');
    }
    const jwtSecret = process.env.JWT_SECRET;

    const token: string = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '1h' },
    );
    return token;
  }

  public async deleteUser(
    userId: number,
    //currentUser: Users,
  ): Promise<boolean> {
    // if (currentUser.role !== 'admin') {
    //   throw new Error('Not authorized to delete user');
    // }

    return (await this.authRepository.deleteUserById(userId)) > 0;
  }

  public async integrateUser(userData: any): Promise<Users> {
    const user = await this.authRepository.findOrCreateUser({
      githubId: userData.id,
      email: userData.email,
      username: userData.login,
    });
    console.log(`Integrated user with email: ${user.email}`);
    return user;
  }
}
