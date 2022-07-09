// importing node modules
const http = require('http');

// importing self built modules
const app = require('./app');

// server customisation
const PORT = process.env.PORT || 8000;

// creating the server
const server = http.createServer(app);

// starting the server
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
