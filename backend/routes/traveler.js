const express = require('express');
const router = express.Router();

const { gettravelers } = require('../controllers/traveler');

router.get('/', gettravelers);

module.exports = router;