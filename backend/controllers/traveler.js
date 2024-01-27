const { Traveler } = require("../models/Schema");

const gettravelers = async (req, res) => {
    try {
        let travelersData = await Traveler.find();
        console.log("Success");
        res.json({ success: true, travelersData });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

module.exports = { gettravelers };