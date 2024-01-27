const mongoose = require("mongoose");
const { Trips } = require("../models/Schema");
const twilio = require("twilio"); // Import Twilio

const accountSid = 'AC95eb4bc976a7d1c3fdf010af6d15342f'; // Replace with your Twilio Account SID
const authToken = '99dff26db954f45184b4a6149ac60f42'; // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);

const BookRide = async (req, res) => {
    try {
        const { id } = req.params;
        const  {email}  = req.body;
        console.log("Email: ", email);
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such ID!!' })
        }

        const trip = await Trips.findById(id);
        console.log(trip);
        if (!trip) {
            return res.status(404).json({ message: "Ride not found" });
        }

        // Send SMS notification to the driver
        // const driverPhoneNumber = trip.driverPhoneNumber; // Replace with the actual path to driver's phone number
        const message = `New booking for your ride! Companion email: ${email}`;
        
        client.messages.create({
            body: message,
            from: '+19863335198', // Replace with your Twilio phone number
            to: '+919630587717',
        }).then((message) => console.log(message.sid)); 

        // Update trip details
        console.log(email);
        trip.companions.push({ email: email});
        trip.numberofCompanions -= 1;
        trip.save();

        res.status(200).json({ message: "Booked successfully", trip });
    } catch (error) {
        console.error("Error booking ride:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { BookRide };
