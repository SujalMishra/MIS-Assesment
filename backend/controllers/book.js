const mongoose = require("mongoose");
const { Trips } = require("../models/Schema");

const BookRide = async (req, res) => {
    try {
        const { id } = req.params;
        const { email } = req.body;
        console.log("Email: ", email);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such ID!!' })
        }

        const trip = await Trips.findById(id);
        // console.log("found my trip");
        trip.companions.push({ email });
        trip.numberofCompanions -= 1;
        trip.save();

        if (!trip) {
            return res.status(404).json({ message: "Ride not found" });
        }

        res.status(200).json({ message: "Booked successfully", trip });
    } catch (error) {
        console.error("Error booking ride:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { BookRide };
