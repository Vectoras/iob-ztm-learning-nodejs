// importing npm modules
const express = require('express');

// importing the controller
const { getAllPlanets } = require('./planets.controller');

// creating the router
const planetsRouter = express.Router();

// --- get -----------

planetsRouter.get('/planets', getAllPlanets);

// --- post ----------

// export
module.exports = planetsRouter;
