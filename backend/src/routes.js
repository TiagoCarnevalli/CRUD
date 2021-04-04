const express = require('require');

const routes = express.Router();

routes.get('/', (request, response) => {
    const params = request.params;

    return response.json({
        aplication: 'Cadastro Fitcard',
        description: 'Teste prático para contratação',
        author: 'Tiago Carnevalli Elias'
    });
});

module.exports = routes;