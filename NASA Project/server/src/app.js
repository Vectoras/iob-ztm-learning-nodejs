// importing npm modules
const express = require('express');
const cors = require('cors');

// creating the app
const app = express();

// importing routes
const planetsRouter = require('./routes/planets/planets.router');

// middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

// using routes
app.use(planetsRouter);

// exports
module.exports = app;
