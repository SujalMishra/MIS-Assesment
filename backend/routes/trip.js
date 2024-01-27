const express = require('express');
const router = express.Router();

const {addTrip, getAll, getAvl} = require('../controllers/trip');


router.post('/', addTrip);

router.get('/', getAll);

router.get('/available', getAvl);

module.exports = router;