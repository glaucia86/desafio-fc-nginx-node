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

const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'nodedb',
};

app.get('/', (_req, res) => {
  InsertName(res);
});

app.listen(PORT, () => {
  console.log(`Application running on Port...: ${PORT} 🚀`);
});

async function getName() {
  const RANDOM = Math.floor(Math.random() * 10);
  const response = await axios.get('https://swapi.dev/api/people');
  return response.data.results[RANDOM].name;
}

async function InsertName(res) {
  const name = await getName();
  const connection = mysql.createConnection(dbConfig);
  const INSERT_QUERY = `INSERT INTO people(name) values('${name}')`;

  connection.query(INSERT_QUERY, (error, _results, _fields) => {
    if (error) {
      console.log(`Error inserting name: ${error}`);
      res.status(500).send('Error inserting name');
      return;
    }

    console.log(`${name} inserted successfully in the database!`);
    getAll(res, connection);
  });
}

function getAll(res, connection) {
  const SELECT_QUERY = `SELECT id, name FROM people`;

  connection.query(SELECT_QUERY, (error, results) => {
    if (error) {
      console.log(`Error getting people: ${error}`);
      res.status(500).send('Error getting people');
      return;
    }

    const tableRows = results
      .map(
        (person) => `
        <tr>
          <td>${person.id}</td>
          <td>${person.name}</td>
        </tr>
      `
      )
      .join('');
    const table = `
      <table>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>${tableRows}
      </table>`;

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      ${table}
    `);

    connection.end();
  });
}
