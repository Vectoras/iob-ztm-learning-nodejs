const express = require('express');
const messagesController = require('../controllers/message.controller');

const messagesRouter = express.Router();

messagesRouter.get('/', messagesController.getMessage);
messagesRouter.post('/', messagesController.postMessage);

module.exports = messagesRouter;
