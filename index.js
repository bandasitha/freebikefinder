const server = require('./server');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
