/**
 * file: src/index.js
 * description: file responsible for running the application.
 * data: 05/29/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

const express = require('express');
const mysql = require('mysql');

const app = express();

const PORT = process.env.PORT || 3000;

const databaseConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(databaseConfig);

const CREATE_TABLE = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))`;
const INSERT_QUERY = `INSERT INTO people(name) values('Glaucia Lemos')`;
const SELECT_QUERY = `SELECT * FROM people`;

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

app.listen(PORT, () => {
  console.log(`Server running on Port...: ${PORT}`);
});
