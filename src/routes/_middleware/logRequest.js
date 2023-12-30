import { logger } from '../../utils';

const Logger = logger.child({ component: 'request' });
const ignorePaths = ['/healthz'];


export function logRequest(req, res, next) {
    const { headers, method, params, path, query } = req;

    if (!ignorePaths.includes(path)) {
        Logger.info(JSON.stringify({ headers, method, path, params, query }));
    }

    next();
};