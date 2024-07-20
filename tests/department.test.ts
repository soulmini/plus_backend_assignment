import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import departmentRoutes from '../src/routes/department';

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use('/departments', departmentRoutes);

describe('Department API', () => {
  let createdDepartmentId: number;

  // Create a department for testing
  beforeAll(async () => {
    const response = await request(app)
      .post('/departments/create')
      .send({
        name: 'HR',
        description: 'Human Resources',
        location: 'Building A',
      });
    createdDepartmentId = response.body.id;
  });

  // Test for creating a department
  it('should create a new department and return the department data', async () => {
    const response = await request(app)
      .post('/departments/create')
      .send({
        name: 'IT',
        description: 'Information Technology',
        location: 'Building B',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'IT');
  });

  // Test for getting all departments with pagination, filtering, and sorting
  it('should retrieve all departments with pagination, sorting, and filtering', async () => {
    const response = await request(app)
      .get('/departments/getAll')
      .query({ page: '1', pageSize: '10', sortBy: 'name', sortOrder: 'asc' });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.pagination).toHaveProperty('total');
  });

  // Test for getting a single department by ID
  it('should retrieve a single department by ID', async () => {
    const response = await request(app)
      .get(`/departments/get/${createdDepartmentId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'HR');
  });

  // Test for updating a department by ID
  it('should update a department by ID', async () => {
    const response = await request(app)
      .put(`/departments/update/${createdDepartmentId}`)
      .send({
        name: 'Updated HR',
        description: 'Updated Human Resources',
        location: 'Updated Building A',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated HR');
  });

  // Test for deleting a department by ID
  it('should delete a department by ID', async () => {
    const response = await request(app)
      .delete(`/departments/delete/${createdDepartmentId}`);

    expect(response.status).toBe(204);
  });

  // Test for handling errors when department does not exist
  it('should return 404 if the department does not exist', async () => {
    const response = await request(app)
      .get('/departments/get/999999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Department not found');
  });

  // Test for handling invalid query parameters
  it('should handle invalid query parameters', async () => {
    const response = await request(app)
      .get('/departments/getAll')
      .query({ page: 'invalid', pageSize: 'invalid', sortBy: 'unknown', sortOrder: 'invalid' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Error fetching departments');
  });
});
