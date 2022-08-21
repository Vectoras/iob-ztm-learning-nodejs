// environmental variables
require('dotenv').config();
// importing node modules
const https = require('https');
const fs = require('fs');
const path = require('path');
// importing npm modules
const express = require('express');
const helmet = require('helmet');

// app configuration
const PORT = 3000;
const app = express();

// Auth configuration
const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

// security middleware
app.use(helmet());

// Auth middleware
function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; // TODO

  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }

  next();
}

// routing
app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/auth/google', (req, res) => {});
app.get('/auth/google/callback', (req, res) => {});
app.get('/auth/logout', (req, res) => {});

// starting the server
https
  .createServer(
    {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
