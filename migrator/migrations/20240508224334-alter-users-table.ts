import { QueryInterface, DataTypes } from 'sequelize';

const USERS_TABLE_NAME: string = 'users';
const PROOF_COLUMN_NAME: string = 'proof';
const PASSWORD_HASH_PART_1_COLUMN_NAME: string = 'passwordHashPart1';
const PASSWORD_HASH_PART_2_COLUMN_NAME: string = 'passwordHashPart2';
const SALT_COLUMN_NAME: string = 'salt';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn(USERS_TABLE_NAME, PROOF_COLUMN_NAME, {
    type: DataTypes.TEXT,
    allowNull: true,
  });
  await queryInterface.addColumn(USERS_TABLE_NAME, SALT_COLUMN_NAME, {
    type: DataTypes.TEXT,
    allowNull: true,
  });
  await queryInterface.addColumn(
    USERS_TABLE_NAME,
    PASSWORD_HASH_PART_1_COLUMN_NAME,
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  );
  await queryInterface.addColumn(
    USERS_TABLE_NAME,
    PASSWORD_HASH_PART_2_COLUMN_NAME,
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn(USERS_TABLE_NAME, PROOF_COLUMN_NAME);
  await queryInterface.removeColumn(USERS_TABLE_NAME, SALT_COLUMN_NAME);
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    PASSWORD_HASH_PART_1_COLUMN_NAME,
  );
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    PASSWORD_HASH_PART_2_COLUMN_NAME,
  );
}

module.exports = {
  up,
  down,
};
