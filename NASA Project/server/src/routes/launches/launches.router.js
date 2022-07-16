// importing npm modules
const express = require('express');

// importing the controller
const { httpGetAllLaunches, httpAddNewLaunch } = require('./launches.controller');

// creating the routher
const launchesRouter = express.Router();

// --- get -----------------
launchesRouter.get('/', httpGetAllLaunches);

// --- post ----------------
launchesRouter.post('/', httpAddNewLaunch);

// exporting
module.exports = launchesRouter;
