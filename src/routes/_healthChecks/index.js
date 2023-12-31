import { Router } from 'express';
// import { VerifyConnection } from '@Database';
import { logger } from '@Utils';
import { OK, INTERNAL_ERROR } from '@StatusCodes';


const healthCheck = Router();
const readinessCheck = Router();

healthCheck.get('/', (req, res) => {
    return res.sendStatus(OK)
});

readinessCheck.get('/', async (req, res) => {
    let status = OK;

    try {
        logger.info('readiness: checking...');
        // await verifyConnection();
        logger.info('readiness: succesful');
    } catch (err) {
        logger.error('readiness: failure');
        status = INTERNAL_ERROR;
    }
    
    return res.sendStatus(status);
});


export {
    healthCheck,
    readinessCheck
};