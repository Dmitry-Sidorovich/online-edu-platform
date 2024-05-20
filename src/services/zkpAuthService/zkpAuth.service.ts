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
import jwt from 'jsonwebtoken';

export class ZkpAuthService {
  private zkpAuthRepository: ZkpAuthRepository = new ZkpAuthRepository();

  async register(
    username: string,
    password: string,
    email: string,
  ): Promise<{ token: string }> {
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

    const user = await this.zkpAuthRepository.create({
      username,
      email,
      passwordHashPart1: parts[0],
      passwordHashPart2: parts[1],
      salt,
      proof: JSON.stringify(proof),
    });

    const token = this.generateToken(user.id, username, email, user.role);
    return { token };
  }

  async authenticate(
    username: string,
    password: string,
  ): Promise<{ isValid: boolean; token?: string }> {
    const userData = await this.zkpAuthRepository.findByUsername(username);
    if (!userData) {
      throw new NotFoundError(`User with username ${username} not found.`);
    }

    const { passwordHashPart1, passwordHashPart2, salt, email } = userData;

    const hashedPassword: string = await hashPassword(password + salt);
    const parts: string[] = splitHashToParts(hashedPassword, 32);
    const decimalParts: string[] = parts.map(hexToDecimal);
    const storedParts: string[] = [passwordHashPart1, passwordHashPart2].map(
      hexToDecimal,
    );

    await generateProof([...decimalParts, ...storedParts]);

    const isValid = await verifyProof();
    if (isValid) {
      const token = this.generateToken(
        userData.id,
        username,
        email,
        userData.role,
      );
      return { isValid, token };
    } else {
      return { isValid };
    }
  }

  private generateToken(
    id: number,
    username: string,
    email: string,
    role: string,
  ): string {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in .env file');
    }
    const jwtSecret = process.env.JWT_SECRET;

    const token: string = jwt.sign({ id, username, email, role }, jwtSecret, {
      expiresIn: '1h',
    });
    return token;
  }
}
