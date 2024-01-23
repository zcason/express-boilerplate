/* This file uses common.js */
const Knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();

const connection = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const knexConfig = {
    client: 'pg',
    connection,
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations',
        directory: './postgres/migrations'
    }
    // seeds: {
    //     directory: './file_route'
    // }
};

function getClient() {
  return Knex(knexConfig);
}


module.exports = { getClient, knexConfig };