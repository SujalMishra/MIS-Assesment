const express = require('express');
const router = express.Router();

const { BookRide } = require('../controllers/book');

router.post('/:id', BookRide);

module.exports = router;