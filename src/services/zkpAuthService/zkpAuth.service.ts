import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { ZkpAuthRepository } from './DAL/zkpAuth.repository';
import {
  compileCircuit,
  setupCircuit,
  generateProof,
  verifyProof,
  hashPassword,
  splitHashToParts,
  hexToDecimal,
} from '../../utils/zkpUtils';
import { NotFoundError } from '../../utils/errors';

export class ZkpAuthService {
  private zkpAuthRepository: ZkpAuthRepository = new ZkpAuthRepository();

  async register(username: string, password: string): Promise<void> {
    await compileCircuit();
    await setupCircuit();

    const salt: string = crypto.randomBytes(16).toString('hex');
    const hashedPassword: string = await hashPassword(password + salt);
    const parts: string[] = splitHashToParts(hashedPassword, 32);
    const decimalParts: string[] = parts.map(hexToDecimal);

    await generateProof([...decimalParts, ...decimalParts]);

    const proof = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'proof.json'), 'utf-8'),
    );
    //const publicSignals = extractPublicSignals();

    await this.zkpAuthRepository.create({
      username,
      passwordHashPart1: parts[0],
      passwordHashPart2: parts[1],
      salt,
      proof: JSON.stringify(proof),
    });
  }

  async authenticate(username: string, password: string): Promise<boolean> {
    const userData = await this.zkpAuthRepository.findByUsername(username);
    if (!userData) {
      throw new NotFoundError(`User with username ${username} not found.`);
    }

    const { passwordHashPart1, passwordHashPart2, salt } = userData;

    const hashedPassword: string = await hashPassword(password + salt);
    const parts: string[] = splitHashToParts(hashedPassword, 32);
    const decimalParts: string[] = parts.map(hexToDecimal);
    const storedParts: string[] = [passwordHashPart1, passwordHashPart2].map(
      hexToDecimal,
    );

    await generateProof([...decimalParts, ...storedParts]);

    return await verifyProof();
  }
}
