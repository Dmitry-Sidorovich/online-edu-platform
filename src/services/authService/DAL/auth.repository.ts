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
    const user = await Users.findOne({ where: { email: userData.email } });

    if (user) {
      // Обновление существующего пользователя
      await user.update({
        githubId: userData.githubId,
        username: userData.username,
      });
      return user;
    } else {
      // Создание нового пользователя
      return await Users.create({
        githubId: userData.githubId,
        email: userData.email,
        username: userData.username,
      });
    }
  }
}
