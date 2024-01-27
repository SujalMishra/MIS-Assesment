const express = require('express');
const { Login, Signup, getFeedback, getTrips } = require('../controllers/user');
const router = express.Router();

router.post('/login', Login);

router.post('/signup', Signup);

router.post('/feedback/:id', getFeedback);

router.post('/trips/:id', getTrips);

module.exports = router;