const crypto = require('crypto');
const srp = require('secure-remote-password/client');

// Определение параметров SRP
const params = {
  N: BigInt(
    '0xAC6BDB41324A9A9BF166DE5E1389582FAF72B6651987EE07FC3192943DB56050A37329CBB4A099ED8193E0757767A13DD52312AB4B03310DCD7F48A9DA04FD50E8083969EDB767B0CF6095179A163AB3661A05FBD5FAAAE82918A9962F0B93B855F97993EC975EEAA80D740ADBF4FF747359D041D5C33EA71D281E44B14773BCA97B43A23FB801676BD207436C6481F1D2B9078717461A5B9D32E688F87748A523E20705AA15E57CAF994CA956AF863E7DBB8B0514DAA3EEB4C0082A5A0E4A38B9890B1B59473A84D7B4CDD65377F0A9F93D5FFC61FDDF4EC57F2D6859072374132FFBF661E5A8D7045AD47D2D849C2774BB73BDF8469126379052F8A4AB4F0612F1F9F6',
  ),
  g: BigInt(2),
  hash: 'sha256',
};

const username = 'newSRP6@example.com';
const password = 'passwordSRP6';
const salt = 'e22d79ac4c0b40b12e70e422a52afb73';

// Создание ключей и верификатора
const privateKey = srp.derivePrivateKey(salt, username, password);
const verifier = srp.deriveVerifier(
  privateKey,
  params.N,
  params.g,
  username,
  password,
  salt,
);

console.log('privateKey:', privateKey);
console.log('verifier:', verifier);

// Генерация клиентского эфемерного ключа
const clientEphemeral = srp.generateEphemeral(privateKey);

console.log(`Client Public Key: ${clientEphemeral.public}`);
console.log(`Client Secret (private key part): ${clientEphemeral.secret}`);

// Предполагаем, что серверный публичный ключ получен от сервера
const serverPublicKey =
  '725ffa80f0e36bf599c0ec4c40ad24206bc5e039ac7602b07a63ee19b3766b5147c349150795c81f97fa7ac8094233deffe3c82e625cc74da5f08d134ef36fa6f53e54cdf31509386e606c21fc693c79d603bdd1f26731f24feda820f7de8fd5f43550a98c7099fb0c35f891bd4d251519ede03240c8fae4a748027b5eb1ed9b3a8f0b0a3a7aa894bbc9c9d4d0f23fcfd0a62c3dd81cf1946d486a41e5d983ac183b0f50115b80aa5d906047b93877dc04f8450adb2162b547a802df400add09479dea6e2422ea0333bc8c9cb8cfc15a0b283a9a1b3eeb4a25666ac5d521c679004ec5dfa659490c137550714cc8b662f4c4fe4d2d127de334981f376ddfeaad9b0fb04e';

// Вычисление scrambling parameter (u)
const u = srp.calculateU(clientEphemeral.public, serverPublicKey, params);
console.log(`Scrambling parameter u: ${u}`);

// Производим деривацию сессии на клиенте
const clientSession = srp.deriveSession(
  clientEphemeral.secret,
  serverPublicKey,
  salt,
  username,
  privateKey,
  params.N,
  params.g,
);

console.log(`Client Proof: ${clientSession.proof}`);
