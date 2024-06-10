const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../app");
const Appointment = require('../models/Appointment');


// Test data
const testDoctorId = 'doctor123';
const testAppointment = {
    doctorId: testDoctorId,
    patientName: 'John Doe',
    patientContact: '1234567890',
    appointmentDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in the future
    reason: 'Regular Checkup',
};

// Mock MongoDB connection
beforeAll(async () => {
    const url = `mongodb://127.0.0.1/test_database`;
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await Appointment.create(testAppointment);
});

afterAll(async () => {
    await Appointment.deleteMany();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe('GET /api/appointments/upcoming', () => {
    it('should fetch upcoming appointments for a given doctor', async () => {
        const response = await request(app)
            .get('/api/appointments/upcoming')
            .query({ doctorId: testDoctorId });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should return 400 for missing query parameter: doctorId', async () => {
        const response = await request(app)
            .get('/api/appointments/upcoming');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});