// importing node modules
const http = require('http');
// importing npm modules
const io = require('socket.io');

// importing the api server (express app)
const apiServer = require('./api');
// importing the sockets
const sockets = require('./sockets');

// creating the http server with the express app as a handler
const httpServer = http.createServer(apiServer);
// creating te io server
const ioServer = io(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// server config
const PORT = 3000;

// server start
httpServer.listen(PORT);
console.log(`Listening on port ${PORT} ...`);

// adding the sockets
sockets.listen(ioServer);
