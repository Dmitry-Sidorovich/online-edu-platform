import { User } from '../../../models/user.model';

export class UserRepository {
    public async createUser(userData: { username: string; email: string; password: string }): Promise<User> {
        return await User.create(userData);
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        return  await User.findOne({ where: { email } });
    }

    public async deleteUserById(userId: number): Promise<number> {
        return await User.destroy({
            where: { id: userId },
        });
    }
}
