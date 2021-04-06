const express = require('express');
const EstablishmentsController = require('./controllers/EstablishmentsController');
// const SearchController = require('./controllers/SearchController');

const routes = express.Router();

routes.get('/establishments', EstablishmentsController.index);
routes.post('/establishments', EstablishmentsController.create);
routes.put('/establishments/:id', EstablishmentsController.edit);
routes.delete('/establishments/:id', EstablishmentsController.delete);

// routes.get('/establishments/search/:text', SearchController.index);

module.exports = routes;