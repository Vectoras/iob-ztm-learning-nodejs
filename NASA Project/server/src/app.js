// importing npm modules
const express = require('express');
const cors = require('cors');
const path = require('path');

console.log(__dirname);

// creating the app
const app = express();

// importing routes
const planetsRouter = require('./routes/planets/planets.router');

// middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// using routes
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));
app.use(planetsRouter);

// exports
module.exports = app;
