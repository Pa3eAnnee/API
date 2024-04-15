import request from 'supertest';
import app from '../src/main';

describe('User Endpoint', () => {
    it('should return list of users', async () => {
        const startTime = Date.now(); // Record start time
        const response = await request(app).get('/users');
        const endTime = Date.now(); // Record end time
        const responseTime = endTime - startTime; // Calculate response time in milliseconds

        expect(responseTime).toBeLessThan(500);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body.all((user: any) => user.id !== undefined)).toBe(true);
    });
});
