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

  public async createUserWithSrp(data: {
    username: string;
    email: string;
    salt: string;
    verifier: string;
  }): Promise<Users> {
    return Users.create(data);
  }

  public async findUserForSrpAuthentication(
    email: string,
  ): Promise<Users | null> {
    const user = await Users.findOne({
      where: { email },
      attributes: ['id', 'salt', 'verifier', 'serverPublicKey', 'serverSecret'],
    });
    return user ? user.get() : null;
  }

  public async updateUser(
    id: number,
    updates: Partial<Users>,
  ): Promise<Users | null> {
    const user = await Users.findByPk(id);
    if (!user) return null;
    return await user.update(updates);
  }
}
