const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { DB } = require('../db');

async function loadCSV() {
  const csvPath = path.join(__dirname, '../../movielist.csv');

  return new Promise((resolve, reject) => {
    const inserts = [];
    const stream = fs.createReadStream(csvPath);

    stream
      .pipe(csv({ separator: ';' }))
      .on('data', (data) => {
        inserts.push(new Promise((res, rej) => {
          const stmt = DB.prepare(`
            INSERT INTO movies (year, title, studios, producers, winner)
            VALUES (?, ?, ?, ?, ?)
          `);

          stmt.run([
            parseInt(data.year),
            data.title,
            data.studios,
            data.producers,
            data.winner
          ], (err) => {
            if (err) rej(err);
            else res();
          });

          stmt.finalize();
        }));
      })
      .on('end', () => {
        Promise.all(inserts)
          .then(() => {
            stream.destroy();
            resolve();
          })
          .catch((err) => {
            stream.destroy();
            reject(err);
          });
      })
      .on('error', (err) => {
        stream.destroy();
        reject(err);
      });
  });
}

module.exports = { loadCSV };
