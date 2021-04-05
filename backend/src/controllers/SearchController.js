const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { text } = request.params;

        const establishments = await connection('establishments').where('phone', text).orWhere('cc', text).select('*');

        return response.json(establishments);
    }
}