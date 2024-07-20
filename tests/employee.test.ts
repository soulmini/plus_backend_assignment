import request from 'supertest';
import app from '../src/index'; // Adjust the import path as necessary
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


describe('Employee API', () => {
  let createdEmployeeId: number;
  

  // Test the POST /create route
  describe('POST /employees/create', () => {
    it('should create a new employee and return the employee data', async () => {
      const response = await request(app)
        .post('/employees/create')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'johno1lc@example.com',
          phoneNumber: '1234567890',
          departmentId: 4,
          dateOfJoining: '2024-07-01',
          position: 'Developer',
          salary: 60000,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.firstName).toBe('John');
      expect(response.body.lastName).toBe('Doe');

      createdEmployeeId = response.body.id; // Save the created employee ID for later use
    });

    it('should return 400 if the request data is invalid', async () => {
      const response = await request(app)
        .post('/employees/create')
        .send({
          firstName: '',
          lastName: '',
          email: 'invalid-email',
          phoneNumber: 'invalid-phone',
          departmentId: 'not-a-number',
          dateOfJoining: 'invalid-date',
          position: '',
          salary: 'not-a-number',
        });

      expect(response.status).toBe(400); // Or 400 or 500 based on your error handling
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test the GET /getAllData route
  describe('GET /employees/getAllData', () => {
    it('should retrieve all employees with pagination and filters', async () => {
      const response = await request(app)
        .get('/employees/getAllData')
        .query({ page: 1, pageSize: 10, sortBy: 'id', sortOrder: 'asc' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
    });

    it('should handle invalid query parameters', async () => {
      const response = await request(app)
        .get('/employees/getAllData')
        .query({ page: 'invalid', pageSize: 'invalid', sortBy: 'unknown', sortOrder: 'invalid' });

      expect(response.status).toBe(400); 
    });
  });

  // Test the GET /getData/:id route
  describe('GET /employees/getData/:id', () => {
    it('should retrieve a single employee by ID', async () => {
      const response = await request(app)
        .get(`/employees/getData/${createdEmployeeId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdEmployeeId);
    });

    it('should return 404 if the employee does not exist', async () => {
      const response = await request(app)
        .get('/employees/getData/999999'); // Assuming this ID does not exist

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Employee not found');
    });
  });

  // Test the PUT /update/:id route
  describe('PUT /employees/update/:id', () => {
    it('should update an employee by ID', async () => {
      const response = await request(app)
        .put(`/employees/update/${createdEmployeeId}`)
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane.doe@example.com',
          phoneNumber: '0987654321',
          departmentId: 2,
          dateOfJoining: '2024-07-02',
          position: 'Manager',
          salary: 70000,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', createdEmployeeId);
      expect(response.body.firstName).toBe('Jane');
    });

    it('should return 404 if the employee does not exist', async () => {
      const response = await request(app)
        .put('/employees/update/999999')
        .send({
          firstName: 'Non',
          lastName: 'Existent',
          email: 'non.existent@example.com',
          phoneNumber: '0000000000',
          departmentId: 3,
          dateOfJoining: '2024-07-03',
          position: 'Intern',
          salary: 30000,
        });

      expect(response.status).toBe(404); // Or 404 based on your error handling
      expect(response.body).toHaveProperty('error', 'Employee not found');
    });
  });

  // Test the DELETE /delete/:id route
  describe('DELETE /employees/delete/:id', () => {
    it('should delete an employee by ID', async () => {
      const response = await request(app)
        .delete(`/employees/delete/${createdEmployeeId}`);

      expect(response.status).toBe(204);
    });

    it('should return 404 if the employee does not exist', async () => {
      const response = await request(app)
        .delete('/employees/delete/999999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Employee not found');
    });
  });
});
