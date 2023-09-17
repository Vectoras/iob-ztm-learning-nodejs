// importing node modules
const path = require('path');
// importing npm modules
const express = require('express');

const api = express();

api.use(express.static(path.join(__dirname, 'public')));

api.use('/', express.static('index.html'));

module.exports = api;
