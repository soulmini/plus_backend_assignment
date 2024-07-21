import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import employees from './routes/employee';
import departmentRoutes from './routes/department';
import projectRoutes from './routes/project';
import timeSheet from './routes/timesheet';
import login from './auth/login';
import signup from './auth/signup';
import { authenticate } from './middleware/authMiddleware';
import exp from 'constants';

dotenv.config();

const prisma = new PrismaClient();

const app = express();

// Define the port to listen on
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Root route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from server');
});

// Test authorization
app.get('/protected', authenticate, (req: Request, res: Response) => {
    res.send(`Hello ${((req as any).user).email}, you have access to this protected route!`);
});

// Authentication routes
app.use('/auth', login);
app.use('/auth', signup);

// Functional routes
app.use('/employees', employees);
app.use('/departments', departmentRoutes);
app.use('/projects', projectRoutes);
app.use('/timesheets', timeSheet);

export default app;
