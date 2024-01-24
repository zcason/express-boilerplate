const TABLE_NAME = 'users';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable(TABLE_NAME, function (table) {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('login_id').unsigned().notNullable();
        table.foreign('login_id').references('id').inTable('users');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(TABLE_NAME);
};
