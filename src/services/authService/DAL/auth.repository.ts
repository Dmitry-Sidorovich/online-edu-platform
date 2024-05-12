import { Users } from '../../../models/users.model';
import { UserRegistrationData } from '../auth.service.interface';

export class AuthRepository {
  public async createUser(userData: UserRegistrationData): Promise<Users> {
    return await Users.create(userData);
  }

  public async findUserByEmail(email: string): Promise<Users | null> {
    return await Users.findOne({ where: { email } });
  }

  public async deleteUserById(userId: number): Promise<number> {
    return await Users.destroy({
      where: { id: userId },
    });
  }

  public async findOrCreateUser(userData: {
    githubId: string;
    email: string;
    username: string;
  }): Promise<Users> {
    const [user, created] = await Users.findOrCreate({
      where: { githubId: userData.githubId },
      defaults: {
        email: userData.email,
        username: userData.username,
      },
    });
    return user;
  }
}
