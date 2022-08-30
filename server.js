const express = require('express');

const routes = require('./routes');

// const server = express();
const server = http.createServer(process.env.PORT || 3000);

server.use(express.json());
// Enable CORS
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
server.use(routes);
console.log("server.js is called")

module.exports = server;
