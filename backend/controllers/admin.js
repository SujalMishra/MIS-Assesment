const { Admin } = require('../models/Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret  = 'secret';

const Login = async (req, res) => {
    let email = req.body.email;
    try {
        let userData = await Admin.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with right credentials" });
        }
        // const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (req.body.password != userData.password) {
            console.log(req.body.password + " " + userData.password);
            return res.status(400).json({ errors: "Try logging1 with right credentials" });
        }

        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.log("db error" + error);
        res.json({ success: false });
    }
};

module.exports = { Login };