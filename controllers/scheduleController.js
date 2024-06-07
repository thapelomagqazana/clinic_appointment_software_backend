const DoctorSchedule = require("../models/DoctorSchedule");

/**
 * Get the schedule and availability of a doctor for a given date range.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getSchedule = async (req, res) => {
    try {
        const { doctorId, startDate, endDate } = req.query;

        // Validate required parameters
        if (!doctorId || !startDate || !endDate) {
            return res.status(400).json({ error: "Missing required query parameters" });
        }

        // Fetch schedule within the specified date range
        const schedule = await DoctorSchedule.find({
            doctorId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
        });

        return res.status(200).json(schedule);
    } catch (err) {
        console.error("Error fetching schedule:", err);
        return res.status(500).json({ error: "Server error" });
    }
};