exports.up = function(knex) {
  return knex.schema.createTable('establishments', function(table) {
    table.string('id').primary();
    table.string('social_name').notNullable();
    table.string('fantasy_name');
    table.string('cnpj').notNullable();
    table.string('email');
    table.string('adress');
    table.string('city');
    table.string('uf', 2);
    table.string('phone');
    table.datetime('date');
    table.string('category');
    table.boolean('status');
    table.string('agency');
    table.string('cc');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('establishments');
};
