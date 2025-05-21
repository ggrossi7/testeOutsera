const { getProducerIntervals } = require('../services/producersService');

async function getProducerIntervalsHandler(req, res) {
  try {
    const result = await getProducerIntervals();
    res.json(result);
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getProducerIntervalsHandler
};
