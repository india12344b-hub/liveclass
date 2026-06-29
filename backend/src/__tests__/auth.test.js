import request from 'supertest';
import app from '../app.js';

describe('Auth endpoints', () => {
  it('registers a user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.accessToken).toBeDefined();
  });

  it('logs in an existing user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'Password123',
    });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
