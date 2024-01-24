import { logger } from '@Utils';

const Logger = logger.child({ component: 'route' });
export default function (req, res) {
    Logger.info('user registering');

    res.send('user registed!'); 
};
