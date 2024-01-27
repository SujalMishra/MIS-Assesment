const express = require('express');

const router = express.Router();

const { UpdateStatus } = require('../controllers/status');

router.patch('/:id', UpdateStatus);

module.exports = router;