import { Router } from 'express';
import { addRequestId, addResponseTime, logRequest } from './_middleware';
import { healthCheck, readinessCheck } from './_healthChecks';
import { logger } from '@Utils';
import { NOT_FOUND } from '@StatusCodes';

import { default as example } from './example';
import { default as auth } from './auth';


const Logger = logger.child({ component: 'route-request' });
const rootRouter = Router();

rootRouter.use(addRequestId());
rootRouter.use(addResponseTime());
 
// log the request
rootRouter.use(logRequest);

rootRouter.use('/healthz', healthCheck);
// check the readiness of the DB
rootRouter.use('/readiness', readinessCheck);

// api
rootRouter.use('/example', example);
rootRouter.use('/auth', auth);


// 404
rootRouter.use((req, res) => {
    Logger.warn(`not found: ${req.path}`);
    res.status(NOT_FOUND).send(`404: ${req.path} NOT FOUND`);
});


export default rootRouter;
export { handleErrors } from './_responseHandler';