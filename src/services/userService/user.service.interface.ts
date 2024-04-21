import { CreationAttributes } from 'sequelize';
import { User } from '../../models/user.model';

export type UserData = CreationAttributes<User>;

