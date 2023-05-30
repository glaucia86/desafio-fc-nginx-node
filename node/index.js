/**
 * file: src/index.js
 * description: file responsible for running the application.
 * data: 05/29/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

const express = require('express');
const axios = require('axios').default;
const mysql = require('mysql');

const app = express();
const PORT = 3000;

const databaseConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb',
};

app.get('/', (_req, res) => {
  insertQuery(res);
});

app.listen(PORT, () => {
  console.log(`Server running on Port...: ${PORT}`);
});

async function getName() {
  const RANDOM = Math.floor(Math.random() * 20);
  const response = await axios.get('https://swapi.dev/api/people');

  return response.data.results[RANDOM].name;
}

async function insertQuery() {
  const name = await getName();
  const connection = mysql.createConnection(databaseConfig);
  connection.query(`INSERT INTO people(name) values('${name}')`);

  console.log(`Name: ${name} inserted successfully in the database!`);

  getAllNames(res, connection);
}

function getAllNames(res, connection) {
  const SELECT_QUERY = 'SELECT name FROM people';

  connection.query(SELECT_QUERY, (_error, result, fields) => {
    const names = result.map((item) => item.name).join(', ');

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h2>Desafio Docker + Nginx+ Node.js - Proxy Reverse</h2>

      <h3>Lista de nomes cadastradas no banco de dados:</h3>
      <ul>
        ${names}
      </ul>
    `);
  });

  connection.end();
}

connection.query(CREATE_TABLE);

connection.query(INSERT_QUERY, (_, response) => {
  connection.query(INSERT_QUERY(response.length + 1));
});

app.get('/', (_req, res) => {
  connection.query(SELECT_QUERY, (_err, result) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h2>Desafio Docker + Nginx+ Node.js - Proxy Reverse</h2>

      <h3>Lista de nomes cadastradas no banco de dados:</h3>
      <ul>
        ${result.map((item) => `<li>${item.name}</li>`).join('')}
      </ul>
    `);
  });
});
