// const knex = require('knex')({
//     client: 'postgres',
//     connection: {
//         host: process.env.DB_HOST,
//         port: Number(process.env.DB_PORT),
//         database: process.env.DB_NAME,
//         user: process.env.DB_USER,
//         password: process.env.DB_PASSWORD
//     },
//     pool: {
//         min: 2,
//         max: 10
//     },
//     migrations: {
//         tableName: 'knex_migrations',
//         directory: './postgres/migrations'
//     }
//     // seeds: {
//     //     directory: './file_route'
//     // }
// });

const knex = require('knex')({client: 'pg'});



module.exports = { getClient: knex };