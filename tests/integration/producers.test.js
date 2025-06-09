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
  it('deve retornar os produtores com maior e menor intervalo entre prêmios baseado no CSV', async () => {
    const res = await request(app)
      .get('/producers/intervals')
      .expect(200);

    const { min, max } = res.body;

    expect(Array.isArray(min)).toBe(true);
    expect(Array.isArray(max)).toBe(true);

    min.forEach(item => {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    });

    max.forEach(item => {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    });

    const expectedMin = [
      {
        producer: 'Joel Silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991
      }
    ];

    const expectedMax = [
      {
        producer: 'Matthew Vaughn',
        interval: 13,
        previousWin: 2002,
        followingWin: 2015
      }
    ];

    expect(min).toEqual(expectedMin);
    expect(max).toEqual(expectedMax);
  });
});
