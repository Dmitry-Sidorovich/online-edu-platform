import { QueryInterface, DataTypes } from 'sequelize';

const USERS_TABLE_NAME: string = 'users';
const GITHUB_ID_COLUMN_NAME: string = 'githubId';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addColumn(USERS_TABLE_NAME, GITHUB_ID_COLUMN_NAME, {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  });

  await queryInterface.changeColumn(USERS_TABLE_NAME, 'email', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });

  await queryInterface.changeColumn(USERS_TABLE_NAME, 'password', {
    type: DataTypes.STRING(255),
    allowNull: true,
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeColumn(USERS_TABLE_NAME, GITHUB_ID_COLUMN_NAME);

  await queryInterface.changeColumn(USERS_TABLE_NAME, 'email', {
    type: DataTypes.STRING(128),
    allowNull: false,
  });

  await queryInterface.changeColumn(USERS_TABLE_NAME, 'password', {
    type: DataTypes.STRING(128),
    allowNull: false,
  });
}

module.exports = {
  up,
  down,
};
