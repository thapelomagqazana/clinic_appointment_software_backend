const express = require("express");
const { sendNotification, getNotifications } = require("../controllers/notificationController");

const router = express.Router();

/**
 * @route POST /api/notifications/send
 * @desc Send a notification
 * @access Public
 */
router.post("/send", sendNotification);

/**
 * @route GET /api/notifications
 * @desc Get notification history for a patient
 * @access Public
 */
router.get('/', getNotifications);

module.exports = router;