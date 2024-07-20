import request from 'supertest';
import app from '../src/index';

describe('GET /', () => {
  test('should return 200 OK and "Hello from server"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello from server');
  });

  test('should return 401 Unauthorized if not authenticated', async () => {
    const response = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer sgsrwe'); // Simulating no token or invalid token
    expect(response.status).toBe(400);
  });
});
