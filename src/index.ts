import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import employees from './routes/employee';
import departmentRoutes from './routes/department';
import projectRoutes from './routes/project';
import timeSheet from './routes/timesheet';

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello from server');
})

app.use('/employees', employees);
app.use('/departments', departmentRoutes);
app.use('/projects', projectRoutes);
app.use('/timesheets', timeSheet);


app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);
})