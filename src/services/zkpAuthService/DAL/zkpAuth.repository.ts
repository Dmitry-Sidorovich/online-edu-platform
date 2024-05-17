import { Users } from '../../../models/users.model';

export class ZkpAuthRepository {
  async create(data: any) {
    return await Users.create(data);
  }

  async findByUsername(username: string) {
    return await Users.findOne({ where: { username } });
  }
}
