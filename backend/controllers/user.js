const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const jwt = require('jsonwebtoken');
const jwtSecret = "secret";
const { Traveler, Feedback, Trips } = require('../models/Schema');

const Signup = async (req, res) => {
    console.log("Called");

    let { email, name, password, whatsapp_number, licenseNumber } = req.body;
    const salt = await bcrypt.genSalt(10)
    let trips = [];
    const hash = await bcrypt.hash(password, salt)
    try {
        await Traveler.create({
            name: name,
            password: hash,
            email: email,
            whatsapp_number: whatsapp_number,
            licenseNumber: licenseNumber,
            trips: trips
        })
        console.log("Success");
        res.json({ success: true });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const Login = async (req, res) => {

    let email = req.body.email;
    try {
        let userData = await Traveler.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with right credentials" });
        }
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            console.log(req.body.password + " " + userData.password);
            return res.status(400).json({ errors: "Try logging1 with right credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
         

        res.cookie("jwtoken", authToken, {
            expires: new Date(Date.now() + 86400000),
            httpOnly: true
        });
        return res.json({ success: true, userData, authToken: authToken });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

const getFeedback = async (req, res) => {

    let { email } = req.body;
    try {
        const feedbacks = await Feedback.find({
            $or: [
                { to: email },
                { from: email }
            ]
        });

        if (!feedbacks) {
            return res.status(400).json({ errors: "Try logging with right credentials" });
        }

        return res.json({ success: true, feedbacks });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }

}

const getTrips = async (req, res) => {
    const { email } = req.body;

    try {
        const trips = await Trips.find({
            $or: [
                { "driverMail": email },
                { 'companions.email': email }
            ]
        });

        res.json({ success: true, trips });
    } catch (error) {
        console.error('Error fetching trips by user:', error);
        res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};

module.exports = { Login, Signup, getFeedback, getTrips };