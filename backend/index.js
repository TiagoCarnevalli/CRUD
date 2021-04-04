const { request } = require('express');
const express = require('express');

const app = express();

app.get('/', (request, response) => {
    return response.json({
        aplication: 'Cadastro Fitcard',
        description: 'Teste prático para contratação',
        author: 'Tiago Carnevalli Elias'
    });
});

app.listen(3333);