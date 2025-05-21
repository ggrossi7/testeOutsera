#  Golden Raspberry Awards API

API RESTful para consultar dados da categoria **Pior Filme** do Golden Raspberry Awards.

---

## Tecnologias utilizadas

- Node.js
- Express
- SQLite (banco em memória)
- csv-parser (para importar dados CSV)
- Jest + Supertest (para testes)

---

## Como instalar

Clone o repositório e instale as dependências:

```bash
npm install express csv-parser sqlite3
npm install --save-dev jest supertest
```

---

## Como rodar a aplicação

A API ficará disponível em http://localhost:3000/producers/intervals

```bash
npm start
```
---

## Como rodar o teste de integração

```bash
npm test
```
