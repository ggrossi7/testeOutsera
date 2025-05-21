const express = require('express');
const { createTable } = require('./db');
const { loadCSV } = require('./utils/loadCSV');
const producersRoutes = require('./routes/producers');

const app = express();
const PORT = 3000;

app.use('/producers', producersRoutes);

async function setupApp() {
  await createTable();
  await loadCSV();
}

async function startServer() {
  await setupApp();

  const server = app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer, setupApp };
