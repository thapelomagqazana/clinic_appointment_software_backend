const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../app");

// Test data
const testDoctorId = 'doctor123';
const testStartDate = '2023-06-01';
const testEndDate = '2023-06-07';

// Mock MongoDB connection
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_database`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('GET /api/schedule', () => {
    it('should fetch the doctor schedule within the given date range', async () => {
        const response = await request(app)
            .get('/api/schedule')
            .query({ doctorId: testDoctorId, startDate: testStartDate, endDate: testEndDate });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should return 400 for missing query parameters', async () => {
        const response = await request(app)
            .get('/api/schedule')
            .query({ doctorId: testDoctorId, startDate: testStartDate });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});