// importing npm modules
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

console.log(__dirname);

// creating the app
const app = express();

// importing routes
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

// middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// using routes
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.use('/*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

// exports
module.exports = app;
