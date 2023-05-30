/**
 * file: src/index.js
 * description: file responsible for running the application.
 * data: 05/29/2023
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('<h1>Full Cycle Rocks!</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on Port...: ${PORT}`);
});
