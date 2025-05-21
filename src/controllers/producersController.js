const { fetchProducersWithIntervals } = require('../services/producersService');

async function getProducerIntervals(req, res) {
  try {
    const result = await fetchProducersWithIntervals();
    res.json(result);
  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getProducerIntervals
};
