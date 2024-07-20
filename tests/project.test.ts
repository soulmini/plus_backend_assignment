import request from 'supertest';
import app from '../src/index';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Project API', () => {
  let createdProjectId: number;

  // Test case for creating a project
  it('should create a new project and return the project data', async () => {
    const response = await request(app)
      .post('/projects/create')
      .send({
        name: 'New Project',
        description: 'Project Description',
        startDate: '2024-07-01T00:00:00.000Z',
        endDate: '2024-08-01T00:00:00.000Z',
        departmentId: 4,
        employeeIds: [4, 12], // Ensure these employee IDs exist in your database
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('New Project');
    createdProjectId = response.body.id;
  });

  // Test case for handling non-existent employee IDs
  it('should return 400 if one or more employee IDs do not exist', async () => {
    const response = await request(app)
      .post('/projects/create')
      .send({
        name: 'New Project',
        description: 'Project Description',
        startDate: '2024-07-01T00:00:00.000Z',
        endDate: '2024-08-01T00:00:00.000Z',
        departmentId: 1,
        employeeIds: [9999], // Non-existent employee ID
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'One or more employee IDs do not exist');
  });

  // Test case for retrieving all projects
  it('should retrieve all projects with pagination, sorting, and filtering', async () => {
    const response = await request(app)
      .get('/projects/getAll')
      .query({ page: '1', pageSize: '10', sortBy: 'id', sortOrder: 'asc' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('pagination');
  });

  // Test case for handling invalid query parameters
  it('should handle invalid query parameters', async () => {
    const response = await request(app)
      .get('/projects/getAll')
      .query({ page: 'invalid', pageSize: 'invalid', sortBy: 'unknown', sortOrder: 'invalid' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid sorting parameters');
  });

  // Test case for retrieving a single project by ID
  it('should retrieve a single project by ID', async () => {
    const response = await request(app)
      .get(`/projects/get/${createdProjectId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProjectId);
  });

  // Test case for handling non-existent project retrieval
  it('should return 404 if the project does not exist', async () => {
    const response = await request(app)
      .get('/projects/get/999999'); // Non-existent project ID

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Project not found');
  });

  // Test case for updating a project by ID
  it('should update a project by ID', async () => {
    const response = await request(app)
      .put(`/projects/update/${createdProjectId}`)
      .send({
        name: 'Updated Project',
        description: 'Updated Description',
        startDate: '2024-07-01T00:00:00.000Z',
        endDate: '2024-09-01T00:00:00.000Z',
        departmentId: 4,
        employeeIds: [4, 12], // Ensure these employee IDs exist in your database
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', createdProjectId);
    expect(response.body.name).toBe('Updated Project');
  });

  // Test case for handling non-existent project update
  it('should return 404 if the project does not exist', async () => {
    const response = await request(app)
      .put('/projects/update/999999')
      .send({
        name: 'Updated Project',
        description: 'Updated Description',
        startDate: '2024-07-01T00:00:00.000Z',
        endDate: '2024-09-01T00:00:00.000Z',
        departmentId: 4,
        employeeIds: [4, 12], // Ensure these employee IDs exist in your database
      });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Project not found');
  });

  // Test case for deleting a project by ID
  it('should delete a project by ID', async () => {
    const response = await request(app)
      .delete(`/projects/delete/${createdProjectId}`);

    expect(response.status).toBe(204);
  });

  // Test case for handling non-existent project deletion
  it('should return 404 if the project does not exist', async () => {
    const response = await request(app)
      .delete('/projects/delete/999999'); // Non-existent project ID

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Project not found');
  });
});
