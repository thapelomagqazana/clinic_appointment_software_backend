const express = require("express");
const { getSchedule } = require("../controllers/scheduleController");

const router = express.Router();

/**
 * @route GET /api/schedule
 * @desc Get doctor schedule and availability
 * @access Public
 */
router.get("/", getSchedule);

module.exports = router;