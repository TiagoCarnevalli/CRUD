const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { text } = request.params;

        const establishments = await connection('establishments').where('social_name', text).select('*');

        return response.json(establishments);
    }
}