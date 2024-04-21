import { UserRepository } from './DAL/user.repository';
import bcrypt from 'bcryptjs';
import {User} from "../../models/user.model";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async registerUser(username: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.createUser({
            username,
            email,
            password: hashedPassword,
        });
    }

    public async authenticateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }

    public async deleteUser(userId: number): Promise<boolean> {
        const deleted = await this.userRepository.deleteUserById(userId);
        return deleted > 0;
    }
}
