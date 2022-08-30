const server = require('./server');

const port = 8000;

server.listen(port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
