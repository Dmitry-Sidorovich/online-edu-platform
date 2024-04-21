import helmet from "helmet";

require('dotenv').config();
import { Express, Request, Response, NextFunction } from 'express';
const express = require('express');
import { authRouter } from './controllers/AuthController/auth.controller';
import {initializeDb} from "./services/dbService/db.service";
import morgan from 'morgan';
//import csurf from 'csurf';

initializeDb();

const app: Express = express();

app.use(morgan('tiny'));
app.use(helmet());
//app.use(csurf({ cookie: true })); // Используйте настройки в соответствии с вашими требованиями

// Middleware для разбора JSON-форматированных тел запросов
app.use(express.json());

// Регистрация маршрутов для аутентификации
app.use('/api/auth', authRouter);

// Обработчик ошибок 404 - Ресурс не найден
app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Resource not found' });
});

// Глобальный обработчик ошибок
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);  // Логгирование ошибки для разработчика
    res.status(500).json({ message: 'Internal server error' });
});

export default app;
