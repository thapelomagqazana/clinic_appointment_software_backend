const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["email", "sms"],
        required: true,
    },
    status: {
        type: String,
        enum: ["sent", "failed"],
        required: true,
    },
    sentAt: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);