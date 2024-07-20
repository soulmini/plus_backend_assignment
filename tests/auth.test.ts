import request from 'supertest';
import app from '../src/index';

describe('POST /auth/login', () => {
  test('should return 200 OK and a token', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});

describe('POST /auth/signup', () => {
    test('should create a new user and return a token', async () => {
      const response = await request(app)
        .post('/auth/signup')
        .send({ email: 'testw342@example.com', password: 'password' });
        
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'User created');
      expect(response.body).toHaveProperty('token');
    });
  
    test('should return 400 if user creation fails', async () => {
      // Simulate user creation failure by sending invalid data
      const response = await request(app)
        .post('/auth/signup')
        .send();
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });
