// importing node modules
const http = require('http');

// importing self built modules
const { loadPlanetsData } = require('./models/planets.model');

// importing the express app
const app = require('./app');

// server customisation
const PORT = process.env.PORT || 8000;

// creating the server
const server = http.createServer(app);

// starting server function
async function startServer() {
  // await for data load
  await loadPlanetsData();

  // server start
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

// starting the server
startServer();
