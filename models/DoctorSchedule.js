const mongoose = require("mongoose");

const DoctorScheduleSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    slots: [
        {
            time: String,
            isBooked: Boolean,
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("DoctorSchedule", DoctorScheduleSchema);