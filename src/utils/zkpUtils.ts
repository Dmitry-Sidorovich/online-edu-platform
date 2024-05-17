import * as snarkjs from 'snarkjs';
import * as fs from 'fs';
import crypto from 'crypto';

interface ProofResult {
  proof: any;
  publicSignals: any;
}

export async function createProof(inputData: any): Promise<ProofResult> {
  const wasmBuffer = fs.readFileSync('./build/circuit.wasm');
  const zkeyBuffer = fs.readFileSync('./build/circuit_final.zkey');
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { in: BigInt('0x' + inputData) }, // Преобразование шестнадцатеричной строки в BigInt,
    wasmBuffer,
    zkeyBuffer,
  );

  return { proof, publicSignals };
}

export async function verifyProof(proof: any, publicSignals: any[]) {
  const vKey = JSON.parse(
    fs.readFileSync('./build/verification_key.json', 'utf8'),
  );
  return await snarkjs.groth16.verify(vKey, publicSignals, proof);
}

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    resolve(hash.digest('hex')); // Возвращает хеш в виде шестнадцатеричной строки
  });
}
