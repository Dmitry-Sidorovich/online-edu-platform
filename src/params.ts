export const SRPParameters = {
  // 1024: {
  //   N_length_bits: 1024,
  //   N: BigInt('0x...'), // замените '...' на реальное значение для N
  //   g: BigInt(2),
  //   hash: 'sha1',
  // },
  2048: {
    N_length_bits: 2048,
    N: BigInt(
      '0xAC6BDB41324A9A9BF166DE5E1389582FAF72B6651987EE07FC3192943DB56050A37329CBB4A099ED8193E0757767A13DD52312AB4B03310DCD7F48A9DA04FD50E8083969EDB767B0CF6095179A163AB3661A05FBD5FAAAE82918A9962F0B93B855F97993EC975EEAA80D740ADBF4FF747359D041D5C33EA71D281E44B14773BCA97B43A23FB801676BD207436C6481F1D2B9078717461A5B9D32E688F87748A523E20705AA15E57CAF994CA956AF863E7DBB8B0514DAA3EEB4C0082A5A0E4A38B9890B1B59473A84D7B4CDD65377F0A9F93D5FFC61FDDF4EC57F2D6859072374132FFBF661E5A8D7045AD47D2D849C2774BB73BDF8469126379052F8A4AB4F0612F1F9F6',
    ),
    g: BigInt(2),
    hash: 'sha256',
  },
  // 4096: {
  //   N_length_bits: 4096,
  //   N: BigInt('0x...'), // замените '...' на реальное значение для N
  //   g: BigInt(5),
  //   hash: 'sha512',
  // },
};