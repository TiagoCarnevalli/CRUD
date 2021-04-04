const express = require('express');

const EstablishmentsController = require('./controllers/EstablishmentsController');

const routes = express.Router();

routes.get('/establishments', EstablishmentsController.index);
routes.post('/establishments', EstablishmentsController.create);

module.exports = routes;