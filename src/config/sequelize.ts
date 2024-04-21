import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';

const sequelize = new Sequelize({
    database: process.env.DB_DATABASE,
    dialect: 'mysql',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +(process.env.PORT as string),
    models: [User]
});

export default sequelize;
