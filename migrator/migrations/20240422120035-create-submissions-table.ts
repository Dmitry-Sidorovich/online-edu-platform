import { QueryInterface, DataTypes } from 'sequelize';

const SUBMISSIONS_TABLE_NAME: string = 'submissions';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable(SUBMISSIONS_TABLE_NAME, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    assignmentId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'assignments',
        key: 'id',
      },
    },
    studentId: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
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
  await queryInterface.dropTable(SUBMISSIONS_TABLE_NAME);
};

module.exports = {
  up,
  down,
};
