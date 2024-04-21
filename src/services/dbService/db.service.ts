import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import {User} from "../../models/user.model";

const sequelizeOptions: SequelizeOptions = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: 'mysql',
    models: [User],
    logging: false,
};

export const sequelize = new Sequelize(sequelizeOptions);

export function initializeDb(): void {
    sequelize.sync({ alter: true, })
        .then(() => {
            console.log('Models synced successfully.');
        })
        .catch((syncError) => {
            console.error('An error occurred while syncing the models:', syncError);
        });
}
