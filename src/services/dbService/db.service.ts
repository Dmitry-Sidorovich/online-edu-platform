import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Users } from '../../models/users.model';
import { Courses } from '../../models/courses.model';
import { Lessons } from '../../models/lessons.model';
import { Assignments } from '../../models/assignments.model';
import { Submissions } from '../../models/submissions.model';
import { Enrollments } from '../../models/enrollments.model';

const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: 'mysql',
  models: [Users, Courses, Lessons, Assignments, Submissions, Enrollments],
  logging: false,
};

export const sequelize = new Sequelize(sequelizeOptions);

export function initializeDb(): void {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log('Models synced successfully.');
    })
    .catch((syncError) => {
      console.error('An error occurred while syncing the models:', syncError);
    });
}
