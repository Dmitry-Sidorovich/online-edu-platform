import { ZkpAuthRepository } from './DAL/zkpAuth.repository';
import { createProof, hashPassword, verifyProof } from '../../utils/zkpUtils';

export class ZkpAuthService {
  private zkpAuthRepository = new ZkpAuthRepository();

  async register(username: string, password: string): Promise<void> {
    const hashedPassword = await hashPassword(password); // Получение хеша пароля
    const { proof, publicSignals } = await createProof(hashedPassword);

    await this.zkpAuthRepository.create({
      username,
      proof: JSON.stringify(proof),
      publicSignals: JSON.stringify(publicSignals),
    });
  }

  async authenticate(username: string, password: string) {
    const userData = await this.zkpAuthRepository.findByUsername(username);
    if (!userData) return false;

    return await verifyProof(
      JSON.parse(userData.proof),
      JSON.parse(userData.publicSignals),
    );
  }
}
