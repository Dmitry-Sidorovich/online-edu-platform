import {
  generateSalt,
  calculateX,
  computeVerifier,
  generateClientPublicKey,
  generateServerPublicKey,
  verifyClientProof,
  calculateSessionKey,
  calculateK,
  generateRandomBigInt,
} from '../../srp';
import { AuthRepository } from '../authService/DAL/auth.repository';
import { SRPParameters } from '../../params';

export class SrpService {
  private params = SRPParameters[2048];
  private authRepository = new AuthRepository();

  public createVerifier(username: string, password: string) {
    const salt = generateSalt();
    console.log(`Generated salt: ${salt.toString('hex')}`);

    const verifier = computeVerifier(
      this.params,
      salt,
      Buffer.from(username),
      Buffer.from(password),
    );
    console.log(`Generated verifier: ${verifier.toString('hex')}`);

    return { salt: salt.toString('hex'), verifier: verifier.toString('hex') };
  }

  public async initiateAuthentication(email: string) {
    const userData =
      await this.authRepository.findUserForSrpAuthentication(email);
    if (!userData) throw new Error('User not found.');

    console.log(`Found user data for: ${email}`);
    console.log(`UserData for verification: ${JSON.stringify(userData)}`);
    console.log('user data:', userData);

    const k = calculateK(this.params);
    console.log(`Calculated k value: ${k.toString()}`);
    const b = generateRandomBigInt(256); // генерация приватного ключа сервера
    console.log(`Generated random b (serverSecret): ${b.toString()}`);

    const verifierBigInt = BigInt('0x' + userData.verifier);

    const serverPublicKey = generateServerPublicKey(
      this.params,
      k,
      verifierBigInt,
      b,
    );
    console.log(
      `Generated server public key: ${serverPublicKey.toString('hex')}`,
    );

    await this.authRepository.updateUser(userData.id, {
      serverPublicKey: serverPublicKey.toString('hex'),
      serverSecret: b.toString(16),
    });

    return {
      salt: userData.salt,
      serverPublicKey: serverPublicKey.toString('hex'),
    };
  }

  public async verifyClientProof(
    email: string,
    clientPublicKeyHex: string,
    clientProofHex: string,
  ) {
    const userData =
      await this.authRepository.findUserForSrpAuthentication(email);
    if (!userData) throw new Error('User not found.');

    //console.log(`UserData for verification: ${JSON.stringify(userData)}`);

    const server = {
      B: BigInt('0x' + userData.serverPublicKey), // Пример значения, должно быть извлечено ранее
      v: BigInt('0x' + userData.verifier),
      k: calculateK(this.params), // Рассчитываем на лету или используем сохраненное значение
      secret: BigInt('0x' + userData.serverSecret), // Пример значения, должен быть сохранен и извлечен
    };

    // console.log(
    //   `Server details for verification: B=${server.B.toString()},
    //    v=${server.v.toString()},
    //    k=${server.k.toString()},
    //    secret=${server.secret.toString()}`,
    // );

    console.log('Received clientPublicKey:', clientPublicKeyHex);
    console.log('Received clientProof:', clientProofHex);

    const clientProofValid = verifyClientProof(
      this.params,
      server,
      BigInt('0x' + clientPublicKeyHex),
      Buffer.from(clientProofHex, 'hex'),
    );

    if (!clientProofValid) {
      console.error('Client proof verification failed.');
      throw new Error('Invalid client proof.');
    } else {
      console.log('Client proof verified successfully.');
    }

    const sessionKey = calculateSessionKey(this.params, {
      verifier: server.v,
      serverSecret: server.secret,
      clientPublicKey: BigInt('0x' + clientPublicKeyHex),
    });
    console.log(`Generated session key: ${sessionKey.toString('hex')}`);

    return { success: true, sessionKey: sessionKey.toString('hex') };
  }
}
