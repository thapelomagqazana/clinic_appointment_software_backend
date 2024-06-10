const express = require('express');
const { getUpcomingAppointments } = require('../controllers/appointmentController');

const router = express.Router();

/**
 * @route GET /api/appointments/upcoming
 * @desc Get upcoming appointments for a doctor
 * @access Public
 */
router.get('/upcoming', getUpcomingAppointments);

module.exports = router;