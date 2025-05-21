const express = require('express');
const router = express.Router();
const { getProducerIntervalsHandler } = require('../controllers/producersController');

router.get('/intervals', getProducerIntervalsHandler);

module.exports = router;
