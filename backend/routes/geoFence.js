const express = require('express');
const router = express.Router();

const { geoSend } = require('../controllers/geoFence');

router.post('/', geoSend);

module.exports = router;