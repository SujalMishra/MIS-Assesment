const { Trips } = require('../models/Schema');

const UpdateStatus = async (req, res) => {
    const { id } = req.params;
    // const { status } = req.body;

    try {
        const trip = await Trips.findOneAndUpdate({_id: id}, {
            ...req.body
          });

        return res.status(200).json({ message: "Status updated successfully", trip });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = { UpdateStatus }