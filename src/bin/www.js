import express from 'express';
import { PORT, logger } from '../utils';
import { routes } from '../routes'; 

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
    // app.use(rootRouter);
    app.use(routes);

    // error handler
    // app.use(handleErrors);  

    app.listen(PORT, () => {
        // replace console log with logger
        console.log(`Server listening at http://localhost:${PORT}`)
    });

    // Add some sort of graceful shutdown
    // Graceful shutdown of node process 
    // gracefulShutdown(server);

};

initialize();