const sqlite3 = require('sqlite3').verbose();

const DB = new sqlite3.Database(':memory:');

function createTable() {
  return new Promise((resolve, reject) => {
    DB.run(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        year INTEGER,
        title TEXT,
        studios TEXT,
        producers TEXT,
        winner TEXT
      )
    `, (err) => {
      if (err) 
        reject(err);
      else 
        resolve();
    });
  });
}

module.exports = { DB, createTable };
