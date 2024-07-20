import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import timesheetRoutes from '../src/routes/timesheet';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/timesheets', timesheetRoutes);

// Test Data
const departmentId = 4;
const employeeIds = [4, 12];
const projectId = 3; 

describe('Timesheet API', () => {
  let createdTimesheetId: number;

  test('POST /timesheets/create should create a new timesheet and return the timesheet data', async () => {
    const response = await request(app)
      .post('/timesheets/create')
      .send({
        employeeId: employeeIds[0],
        projectId,
        date: '2024-07-20T00:00:00.000Z',
        hoursWorked: 8,
        description: 'Test timesheet',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTimesheetId = response.body.id;
  });

  test('GET /timesheets/getAll should retrieve all timesheets with pagination, sorting, and filtering', async () => {
    const response = await request(app)
      .get('/timesheets/getAll')
      .query({
        page: '1',
        pageSize: '10',
        sortBy: 'date',
        sortOrder: 'asc',
        employeeId: employeeIds[0],
        projectId,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination).toHaveProperty('total');
  });

  test('GET /timesheets/get/:id should retrieve a single timesheet by ID', async () => {
    const response = await request(app)
      .get(`/timesheets/get/${createdTimesheetId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTimesheetId);
  });

  test('PUT /timesheets/update/:id should update a timesheet by ID', async () => {
    const response = await request(app)
      .put(`/timesheets/update/${createdTimesheetId}`)
      .send({
        employeeId: employeeIds[1],
        projectId,
        date: '2024-07-21T00:00:00.000Z',
        hoursWorked: 7,
        description: 'Updated timesheet',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdTimesheetId);
    expect(response.body.hoursWorked).toBe(7);
  });

  test('DELETE /timesheets/delete/:id should delete a timesheet by ID', async () => {
    const response = await request(app)
      .delete(`/timesheets/delete/${createdTimesheetId}`);

    expect(response.status).toBe(204);
  });

  test('GET /timesheets/get/:id should return 404 if the timesheet does not exist', async () => {
    const response = await request(app)
      .get('/timesheets/get/999999'); // Non-existent ID

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Timesheet not found');
  });
});
