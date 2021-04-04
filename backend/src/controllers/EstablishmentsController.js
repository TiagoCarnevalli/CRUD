const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const establishments = await connection('establishments').select('*');
    
        return response.json(establishments);
    },
    
    async create(request, response) {
        const {
            social_name,
            fantasy_name,
            cnpj,
            email,
            adress,
            city,
            uf,
            phone,
            date,
            category,
            status,
            agency,
            cc
        } = request.body;
    
        const id = crypto.randomBytes(4).toString('HEX');
    
        await connection('establishments').insert({
            id,
            social_name,
            fantasy_name,
            cnpj,
            email,
            adress,
            city,
            uf,
            phone,
            date,
            category,
            status,
            agency,
            cc
        })
    
        return response.json({ id });
    }
}