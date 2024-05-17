import * as fs from 'fs';
import * as path from 'path';
import crypto from 'crypto';

const zokratesPath = process.cwd(); // Директория проекта

export async function compileCircuit(): Promise<void> {
  console.log('Compiling circuit...');
  const { execSync } = require('child_process');
  execSync(
    `zokrates compile -i ${path.join(zokratesPath, 'circuit.zok')} --stdlib-path ${path.join(zokratesPath, 'ZoKrates', 'zokrates_stdlib', 'stdlib')}`,
    { stdio: 'inherit' },
  );
}

export async function setupCircuit(): Promise<void> {
  console.log('Setting up circuit...');
  const { execSync } = require('child_process');
  execSync('zokrates setup', { stdio: 'inherit' });
}

export async function generateProof(inputParts: string[]): Promise<void> {
  console.log('Generating proof...');
  const { execSync } = require('child_process');
  const inputArgs = inputParts.join(' ');
  execSync(`zokrates compute-witness -a ${inputArgs}`, { stdio: 'inherit' });

  execSync('zokrates generate-proof', { stdio: 'inherit' });
}

export async function verifyProof(): Promise<boolean> {
  console.log('Verifying proof...');
  const { execSync } = require('child_process');
  try {
    execSync('zokrates verify', { stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    resolve(hash.digest('hex')); // Возвращает хеш в виде шестнадцатеричной строки
  });
}

export function splitHashToParts(hash: string, partSize: number): string[] {
  return [hash.substring(0, partSize), hash.substring(partSize)];
}

export function hexToDecimal(hex: string): string {
  return BigInt(`0x${hex}`).toString(10);
}

// export function extractPublicSignals(): string[] {
//   const witnessContent = fs.readFileSync(
//     path.join(zokratesPath, 'witness'),
//     'utf-8',
//   );
//   const publicSignals = witnessContent.split('\n').slice(1); // Извлекаем публичные сигналы, начиная со второй строки
//   return publicSignals;
// }
