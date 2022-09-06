const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const server = express();
server.use(express.json());

// // Enable CORS
server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

server.use(cors({ credentials: true }));

function login(req, res, next) {
  next();
}

server.use(login);

server.use(routes);

module.exports = server;
