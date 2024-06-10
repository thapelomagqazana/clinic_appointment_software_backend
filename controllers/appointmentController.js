const Appointment = require("../models/Appointment");

/**
 * Get the upcoming appointments for a given doctor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getUpcomingAppointments = async (req, res) => {
    try {
        const { doctorId } = req.query;

        // Validate required parameters
        if (!doctorId) {
            return res.status(400).json({ error: "Missing required query parameter: doctorId" });
        }

        // Fetch upcoming appointments
        const upcomingAppointments = await Appointment.find({
            doctorId,
            appointmentDate: { $gte: new Date() },
        }).sort({ appointmentDate: 1 });

        return res.status(200).json(upcomingAppointments);
    } catch (err) {
        console.error('Error fetching upcoming appointments:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};