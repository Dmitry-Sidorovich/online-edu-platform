import { QueryInterface, DataTypes } from 'sequelize';

const USERS_TABLE_NAME: string = 'users';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable(USERS_TABLE_NAME, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(128),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(128),
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING(128),
      defaultValue: 'student',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.dropTable(USERS_TABLE_NAME);
};

module.exports = {
  up,
  down,
};
