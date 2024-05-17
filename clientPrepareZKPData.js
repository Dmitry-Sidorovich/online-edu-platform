const crypto = require('crypto');

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    resolve(hash.digest('hex')); // Возвращает хеш в виде шестнадцатеричной строки
  });
}

function splitHashToParts(hash, partSize) {
  return [hash.substring(0, partSize), hash.substring(partSize)];
}

(async () => {
  const password = 'password123';
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = await hashPassword(password + salt);
  const parts = splitHashToParts(hashedPassword, 32);
  console.log('Hash Parts:', parts);
})();
