const express = require('express');
const router = express.Router();
const { getProducerIntervals } = require('../controllers/producersController');

router.get('/intervals', getProducerIntervals);

module.exports = router;
