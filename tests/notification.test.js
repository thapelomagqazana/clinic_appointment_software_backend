const request = require('supertest');
const mongoose = require('mongoose');
const Notification = require('../models/Notification');
const app = require("../app");

// Test data
const testPatientId = 'patient123';
const testNotification = {
    patientId: testPatientId,
    message: 'Your appointment is scheduled.',
    type: 'email',
    status: 'sent',
    sentAt: new Date(),
};

// Mock MongoDB connection
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_database`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await Notification.create(testNotification);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('POST /api/notifications/send', () => {
    it('should send a notification', async () => {
        const response = await request(app)
            .post('/api/notifications/send')
            .send({ patientId: testPatientId, message: 'Your appointment is tomorrow.', type: 'sms' });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('patientId', testPatientId);
        expect(response.body).toHaveProperty('message', 'Your appointment is tomorrow.');
        expect(response.body).toHaveProperty('type', 'sms');
        expect(response.body).toHaveProperty('status', 'sent');
    });

    it('should return 400 for missing required fields', async () => {
        const response = await request(app)
            .post('/api/notifications/send')
            .send({ patientId: testPatientId, message: 'Your appointment is tomorrow.' });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});

describe('GET /api/notifications', () => {
    it('should fetch notification history for a patient', async () => {
        const response = await request(app)
            .get('/api/notifications')
            .query({ patientId: testPatientId });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing query parameter: patientId', async () => {
        const response = await request(app)
            .get('/api/notifications');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});