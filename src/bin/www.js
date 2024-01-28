import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { migrateLatest, verifyConnection } from '@Database';
import { logger, PORT } from '@Utils';
import rootRouter, { handleErrors } from '@Routes'; 
import gracefulShutdown from './gracefulShutdown';


const app = express();
// reevalute cors before depolying
const corsOption = {
    origin: ['http://localhost:3000'],
};

async function initialize() {
    logger.info('initializing service...');

    // verify connection to postgres
    await verifyConnection();

    // run migrations
    await migrateLatest();

    // Make sure the 'x-powered-by' is disabled by default
    app.use(helmet());

    // hide server type from browser 
    // app.disable('x-powered-by'); 

    app.use(cors(corsOption));

    app.use(express.json());

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
