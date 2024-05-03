import { QueryInterface, DataTypes } from 'sequelize';

const USERS_TABLE_NAME: string = 'users';
const SERVER_PUBLIC_KEY_COLUMN_NAME: string = 'serverPublicKey';
const SERVER_SECRET_COLUMN_NAME: string = 'serverSecret';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn(
    USERS_TABLE_NAME,
    SERVER_PUBLIC_KEY_COLUMN_NAME,
    {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  );

  await queryInterface.addColumn(USERS_TABLE_NAME, SERVER_SECRET_COLUMN_NAME, {
    type: DataTypes.TEXT,
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    SERVER_PUBLIC_KEY_COLUMN_NAME,
  );
  await queryInterface.removeColumn(
    USERS_TABLE_NAME,
    SERVER_SECRET_COLUMN_NAME,
  );
}

module.exports = {
  up,
  down,
};
