const { Trips } = require("../models/Schema");

const addTrip = async (req, res) => {
    let { driverName, driverPhoneNumber, driverMail, cabNumber, startlocation, endlocation, status, numberofCompanions, companions, startTime, endTime, Feedback } = req.body;
    try {
        await Trips.create({
            driverName: driverName,
            driverPhoneNumber: driverPhoneNumber,
            driverMail: driverMail,
            cabNumber: cabNumber,
            startlocation: startlocation,
            endlocation: endlocation,
            status: status,
            numberofCompanions: numberofCompanions,
            companions: companions,
            startTime: startTime,
            endTime: endTime,
            Feedback: Feedback,
        })
        console.log("Success");
        res.json({ success: true });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const getAll = async (req, res) => {
    try {
        let tripsData = await Trips.find();
        console.log("Success");
        res.json({ success: true, tripsData });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const getAvl = async (req, res) => {
    try {
        let tripsData = await Trips.find({ status: { $in: ["In Progress", "Scheduled"] } });
        console.log("Success");
        res.json({ success: true, tripsData });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
}

module.exports = { addTrip, getAll, getAvl };