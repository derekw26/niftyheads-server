const express = require('express');
const ejs = require('ejs');
const Sequelize = require('sequelize');

const server = express();
server.set('view-engine', ejs);
const PORT = 1337;

server.get('/', (req, res) => {
  res.render('home.ejs');
})

server.listen(PORT, () => console.log(`Now server is hosting on http://localhost:${PORT}`));
