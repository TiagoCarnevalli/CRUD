const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        // const { page = 1 } = request.query;

        const [count] = await connection('establishments').count();
        console.log(count);
        const establishments = await connection('establishments')
        // .limit(10)
        // .offset((page-1) * 5)
        .select('*');

        response.header('X-Register-Count', count['count(*)']);
    
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
    },

    async delete(request, response) {
        const { id } = request.params;

        const establishment = await connection('establishments').where('id', id).select('id').first();

        if (establishment.id !== id) {
            return response.status(401).json({error: 'Operação não permitida.'});
        }

        await connection('establishments').where('id', establishment.id).delete();

        return response.status(204).send();
    }
}