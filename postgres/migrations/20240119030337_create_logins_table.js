const TABLE_NAME = 'logins';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable(TABLE_NAME, function (table) {
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('password_hash').notNullable();
        table.string('password_salt').notNullable();
        table.timestamp('last_login_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable(TABLE_NAME);
};
