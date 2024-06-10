const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
    },
    patientContact: {
        type: String,
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);