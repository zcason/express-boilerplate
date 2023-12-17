import { Router } from "express";
import { logger } from "@Utils";
import { OK, INTERNAL_ERROR } from '@StatusCodes';
// import { VerifyConnection } from '@Database';


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