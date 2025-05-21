const request = require('supertest');
const { app, setupApp, startServer } = require('../../src/index');
const { DB } = require('../../src/db');

let server;

beforeAll(async () => {
  await setupApp();
  server = await startServer();
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    DB.close(err => (err ? reject(err) : resolve()));
  });

  if (server) {
    await new Promise((resolve, reject) => {
      server.close(err => (err ? reject(err) : resolve()));
    });
  }
});

describe('GET /producers/intervals', () => {
  it('deve retornar produtores com maior e menor intervalo entre prêmios', async () => {
    const res = await request(app)
      .get('/producers/intervals')
      .expect(200);

    expect(res.body).toHaveProperty('min');
    expect(res.body).toHaveProperty('max');
    expect(Array.isArray(res.body.min)).toBe(true);
    expect(Array.isArray(res.body.max)).toBe(true);

    if (res.body.min.length > 0) {
      expect(res.body.min[0]).toHaveProperty('producer');
      expect(res.body.min[0]).toHaveProperty('interval');
      expect(res.body.min[0]).toHaveProperty('previousWin');
      expect(res.body.min[0]).toHaveProperty('followingWin');
    }

    if (res.body.max.length > 0) {
      expect(res.body.max[0]).toHaveProperty('producer');
      expect(res.body.max[0]).toHaveProperty('interval');
      expect(res.body.max[0]).toHaveProperty('previousWin');
      expect(res.body.max[0]).toHaveProperty('followingWin');
    }
  });
});
