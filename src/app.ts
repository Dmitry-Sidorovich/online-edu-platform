import helmet from 'helmet';
require('dotenv').config();
import { Express, Request, Response } from 'express';
import express from 'express';
import { authRouter } from './controllers/AuthController/auth.controller';
import { initializeDb } from './services/dbService/db.service';
import morgan from 'morgan';
import { coursesRouter } from './controllers/CoursesController/courses.controller';
import { lessonsRouter } from './controllers/LessonsController/lessons.controller';
import { assignmentsRouter } from './controllers/AssignmentsController/assignments.controller';
import { submissionsRouter } from './controllers/SubmissionsController/submissions.controller';
import { authMiddleware } from './middlewares/authMiddleware';
import errorHandler from './middlewares/errorHandler';
import { enrollmentsRouter } from './controllers/EnrollmentsController/enrollments.controller';
import { githubAuthRouter } from './controllers/GitHubAuthController/githubAuth.controller';
import { zkpAuthRouter } from './controllers/ZkpAuthController/zkpAuth.controller';
//import csurf from 'csurf';

initializeDb();

const app: Express = express();

app.use(morgan('tiny'));
app.use(helmet());
//app.use(csurf({ cookie: true })); // Используйте настройки в соответствии с вашими требованиями

// Middleware для разбора JSON-форматированных тел запросов
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/github-auth', githubAuthRouter);
app.use('/api/zkp-auth', zkpAuthRouter);

app.use('/api', authMiddleware);

app.use('/api/courses', coursesRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/assignments', assignmentsRouter);
app.use('/api/submissions', submissionsRouter);
app.use('/api/enrollments', enrollmentsRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Resource not found' });
});
app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.use(errorHandler);

export default app;
