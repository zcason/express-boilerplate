import express from 'express';
import { migrateLatest, verifyConnection } from '@Database';
import { logger, PORT } from '@Utils';
import rootRouter, { handleErrors } from '@Routes'; 
import gracefulShutdown from './gracefulShutdown';


const app = express();

async function initialize() {
    logger.info('initializing service...');

    // hide server type from browser
    app.disable('x-powered-by');

    // verify connection to postgres
    await verifyConnection();

    // run migrations
    await migrateLatest();

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

initialize()
 .catch(error => logger.error(error));
