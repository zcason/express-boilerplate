import { randomUUID } from 'node:crypto';
import pgPromise from 'pg-promise';
import { logger } from '@Utils';


const dbLogger = logger.child({ component: 'postgres' });
const queryLogger = logger.child({ component: 'query' });
const dbConnection = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    application_name: 'tomus-backend-demo',
    max: 10
};

const initOptions = {
    capSQL: true,
    noWarnings: false,
    query(queryToBeExecuted) {
        const { query, params, dc, ctx } = queryToBeExecuted;
        queryLogger.info('query', { query, params, dc, ctx });
    },
    connect({ client , dc }) {
        const {
            processID,
            connectionParameters: { host, port, user, database }
        } = client;

        dbLogger.info(`connection: { processId: ${processID}, dbContetxt: ${dc}, host: ${host}, post: ${port}, ${user}, database: ${database} }`);
    },
    disconnect({ client , dc }) {
        const {
            processID,
            connectionParameters: { host, port, user, database }
        } = client;

        dbLogger.info(`disconnect: releasing the virtual connection { processId: ${processID}, dbContetxt: ${dc}, host: ${host}, post: ${port}, ${user}, database: ${database} }`);
    },
    error(error, { ctx, query, cn }) {
        if (cn) {
            // connection error
            // if the password is present it's maksed by #
            dbLogger.error(`connection: ${JSON.stringify(cn)}`);
        }

        if (query) {
            delete error.result;
            queryLogger.error(JSON.stringify(error));
        }

        if (ctx) {
            // occurred inside a task or transaction
            dbLogger.error(`context: ${JSON.stringify(ctx)}`);
        }
    }
};

const pgp = pgPromise(initOptions);
const pg = pgp(dbConnection, randomUUID());

// database context (dc) equals uuid
// See Database API: https://vitaly-t.github.io/pg-promise/Database.html

async function verifyConnection() {
    dbLogger.info('verifying connection');
    return pg.connect().then(cn => cn.done());
};


export { pgp, verifyConnection };
export default pg;

// export * as sql from './sql';
export { migrateLatest } from './migrations';
// export { DatabaseError } from './errors';
