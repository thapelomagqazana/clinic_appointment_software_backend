const Notification = require("../models/Notification");

/**
 * Send a notification to a patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.sendNotification = async (req, res) => {
    try {
        const { patientId, message, type } = req.body;

        // Validate required parameters
        if (!patientId || !message || !type) {
            return res.status(400).json({ error: "Missing required fields: patientId, message, type" });
        }

        // Simulate sending notification (In real scenario, integrate with email/SMS service)
        const status = "sent";
        const sentAt = new Date();

        // Save notification to the database
        const notification = new Notification({ patientId, message, type, status, sentAt });
        await notification.save();

        return res.status(201).json(notification);
    } catch (err) {
        console.error("Error sending notification:", err);
        return res.status(500).json({ error: "Server error" });
    }
};

/**
 * Get notification history for a given patient.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getNotifications = async (req, res) => {
    try {
        const { patientId } = req.query;

        // Validate required parameter
        if (!patientId) {
            return res.status(400).json({ error: "Missing required query parameter: patientId" });
        }

        // Fetch notification history
        const notifications = await Notification.find({ patientId }).sort({ sentAt: -1 });

        return res.status(200).json(notifications);
    } catch (err) {
        console.error("Error fetching notifications:", err);
        return res.status(500).json({ error: "Server error" });
    }
};