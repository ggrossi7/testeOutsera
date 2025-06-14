const { DB } = require('../db');

function getProducerIntervals() {
  return new Promise((resolve, reject) => {
    DB.all(`SELECT year, producers FROM movies WHERE LOWER(winner) = 'yes'`, [], (err, rows) => {
      if (err) 
        return reject(err);

      const producerMap = {};

      rows.forEach(({ year, producers }) => {
        if (!producers || typeof producers !== 'string') 
          return;
        
        const names = producers.split(/,| and /).map(p => p.trim());

        names.forEach(name => {
          if (!producerMap[name]) 
            producerMap[name] = [];

          producerMap[name].push(parseInt(year));
        });
      });

      const intervals = [];

      for (const [producer, years] of Object.entries(producerMap)) {
        if (years.length < 2) 
          continue;

        const sorted = years.sort((a, b) => a - b);
        
        for (let i = 1; i < sorted.length; i++) {
          const interval = sorted[i] - sorted[i - 1];
          if (interval > 0) {
            intervals.push({
              producer,
              interval,
              previousWin: sorted[i - 1],
              followingWin: sorted[i]
            });
          }
        }
      }

      if (intervals.length === 0) {
        return resolve({ min: [], max: [] });
      }

      const minInterval = Math.min(...intervals.map(i => i.interval));
      const maxInterval = Math.max(...intervals.map(i => i.interval));

      resolve({
        min: intervals.filter(i => i.interval === minInterval),
        max: intervals.filter(i => i.interval === maxInterval)
      });
    });
  });
}

module.exports = {
  getProducerIntervals
};