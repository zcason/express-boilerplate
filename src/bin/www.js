import express from 'express';
// import { migrateLatest, verifyConnection } from '@Database';
import { logger, PORT } from '../utils/index.js';
import rootRouter, { handleErrors } from '../routes/index.js'; 
import gracefulShutdown from './gracefulShutdown.js';

const app = express();

// add async finctionality to it 
function initialize() {
    logger.info('initializing service...');

    // hide server type from browser
    app.disable('x-powered-by');

    // verify connection to postgres
    // await verifyConnection();

    // run migrations
    // await migrationLastest();

    // implement route setter middleware (ex. below)
    // set routes
    app.use('/api', rootRouter);

    // error handler
    app.use(handleErrors);  

    const server = app.listen(PORT, () => {
        logger.info(`[server]: Server is running at http://localhost:${PORT}`);
    });

    // Graceful shutdown of node process 
    gracefulShutdown(server);
};

initialize();
// .catch(error => logger.error(error));
