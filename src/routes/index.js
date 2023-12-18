import { Router } from 'express';
import { addRequestId, addResponseTime, logRequest } from './_middleware/index.js';
import { logger, STATUS_CODE } from '../utils/index.js';
import { healthCheck, readinessCheck } from './_healthChecks/index.js';

// Constant(s)
const { NOT_FOUND } = STATUS_CODE;

import { default as example } from './example/index.js';

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


// 404
rootRouter.use((req, res) => {
    Logger.warn(`not found: ${req.path}`);
    res.status(NOT_FOUND).send(`404: ${req.path} NOT FOUND`);
});


export default rootRouter;
export { handleErrors } from './_responseHandler/index.js';