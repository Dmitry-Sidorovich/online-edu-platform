// src/srp.ts
import { createHash, randomBytes } from 'crypto';

export function generateSalt(): Buffer {
  return randomBytes(16);
}

export function calculateX(
  params: { N: bigint; g: bigint; hash: string },
  salt: Buffer,
  I: Buffer,
  P: Buffer,
): bigint {
  const hashIP = createHash(params.hash)
    .update(Buffer.concat([I, Buffer.from(':'), P]))
    .digest('hex');
  console.log(`Hash of (I:P): ${hashIP}`);

  const hashX = createHash(params.hash)
    .update(Buffer.concat([salt, Buffer.from(hashIP, 'hex')]))
    .digest('hex');
  console.log(`Hash of (salt|Hash(I:P)): ${hashX}`);

  return BigInt('0x' + hashX);
}

export function computeVerifier(
  params: { N: bigint; g: bigint; hash: string },
  salt: Buffer,
  I: Buffer,
  P: Buffer,
): Buffer {
  const x = calculateX(params, salt, I, P);
  console.log(`Calculated x: ${x}`);

  const v = modPow(params.g, x, params.N);
  console.log(`Computed verifier v: ${v}`);

  return Buffer.from(v.toString(16), 'hex');
}

export function generateClientPublicKey(
  params: { N: bigint; g: bigint; hash: string },
  a: bigint,
): Buffer {
  const A = params.g ** a % params.N;
  return Buffer.from(A.toString(16), 'hex');
}

export function generateServerPublicKey(
  params: { N: bigint; g: bigint; hash: string },
  k: bigint,
  v: bigint,
  b: bigint,
): Buffer {
  // Вычисление серверного публичного ключа B = (k * v + g^b % N) % N
  const B = (k * v + modPow(params.g, b, params.N)) % params.N;

  return Buffer.from(B.toString(16), 'hex');
}

export function verifyClientProof(
  params: { N: bigint; g: bigint; hash: string },
  server: { B: bigint; v: bigint; k: bigint; secret: bigint },
  clientPublicKey: bigint,
  clientProof: Buffer,
): boolean {
  // Вычисляем значение 'u' (scrambling parameter)
  const u = calculateU(params, clientPublicKey, server.B);
  console.log(`\n\nCalculated scrambling parameter u: ${u.toString()}`);

  // Вычисляем сессионный ключ на сервере
  const S = calculateServerSessionKey(
    params,
    server.v,
    clientPublicKey,
    server.secret,
    u,
  );
  console.log(`\nCalculated server session key S: ${S.toString()}`);

  const K = hashSessionKey(params, S);
  console.log(`Hashed session key K: ${K.toString('hex')}`);

  // Вычисляем значение 'M' (client proof)
  const M = calculateM(params, clientPublicKey, server.B, K);
  console.log(`\nCalculated client proof M: ${M.toString()}`);

  // Преобразуем полученное доказательство клиента в bigint для сравнения
  const clientM = BigInt('0x' + clientProof.toString('hex'));
  console.log(`\nReceived client proof M: ${clientM.toString()}`);

  // Проверяем, совпадает ли полученное доказательство с отправленным клиентом
  return M === clientM;
}

function calculateU(
  params: { N: bigint; g: bigint; hash: string },
  A: bigint,
  B: bigint,
): bigint {
  const hash = createHash(params.hash)
    .update(Buffer.from(A.toString(16), 'hex'))
    .update(Buffer.from(B.toString(16), 'hex'))
    .digest();
  return BigInt('0x' + hash.toString('hex'));
}

function hashSessionKey(params: { hash: string }, S: bigint): Buffer {
  return createHash(params.hash)
    .update(Buffer.from(S.toString(16), 'hex'))
    .digest();
}

function calculateM(
  params: { hash: string },
  A: bigint,
  B: bigint,
  K: Buffer,
): bigint {
  const hash = createHash(params.hash)
    .update(Buffer.from(A.toString(16), 'hex'))
    .update(Buffer.from(B.toString(16), 'hex'))
    .update(K)
    .digest();
  return BigInt('0x' + hash.toString('hex'));
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2n === 1n) result = (result * base) % modulus;
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }
  return result;
}

export function calculateSessionKey(
  params: { N: bigint; g: bigint; hash: string },
  server: { verifier: bigint; serverSecret: bigint; clientPublicKey: bigint },
): Buffer {
  // Вычисляем значение 'u' (scrambling parameter)
  const u = calculateU(params, server.clientPublicKey, server.verifier);

  // Вычисляем сессионный ключ на сервере
  const S = calculateServerSessionKey(
    params,
    server.verifier,
    server.clientPublicKey,
    server.serverSecret,
    u,
  );

  // Хэшируем сессионный ключ для безопасности
  return hashSessionKey(params, S);
}

function calculateServerSessionKey(
  params: { N: bigint; g: bigint; hash: string },
  v: bigint,
  A: bigint,
  b: bigint,
  u: bigint,
): bigint {
  // Вычисляем сессионный ключ с использованием модульного возведения в степень
  return modPow(A * modPow(v, u, params.N), b, params.N);
}

export function generateRandomBigInt(bitLength: number): bigint {
  const bytes = (bitLength + 7) >> 3; // Количество байт для заданной длины в битах
  const randomBuffer = randomBytes(bytes);
  return BigInt('0x' + randomBuffer.toString('hex'));
}

export function calculateK(params: {
  N: bigint;
  g: bigint;
  hash: string;
}): bigint {
  const hashInput = Buffer.concat([
    Buffer.from(params.N.toString(16), 'hex'),
    Buffer.from(params.g.toString(16), 'hex'),
  ]);
  const hashOutput = createHash(params.hash).update(hashInput).digest();
  return BigInt('0x' + hashOutput.toString('hex'));
}
