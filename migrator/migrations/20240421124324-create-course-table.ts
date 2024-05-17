import { QueryInterface, DataTypes } from 'sequelize';

const COURSES_TABLE_NAME: string = 'courses';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.createTable(COURSES_TABLE_NAME, {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.TEXT
        },
        teacherId: {
            allowNull: false,
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.dropTable(COURSES_TABLE_NAME);
};

module.exports = {
    up,
    down,
};
