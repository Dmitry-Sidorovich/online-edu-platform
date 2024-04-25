import { QueryInterface, DataTypes } from 'sequelize';

const ASSIGNMENTS_TABLE_NAME = 'assignments';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  await queryInterface.createTable(ASSIGNMENTS_TABLE_NAME, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    lessonId: {
      allowNull: true,
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'lessons',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    description: {
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
  await queryInterface.dropTable(ASSIGNMENTS_TABLE_NAME);
};

module.exports = {
  up,
  down,
};
