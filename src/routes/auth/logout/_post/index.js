import { logger } from '@Utils';


const Logger = logger.child({ component: 'route' });
export default function (req, res) {
    Logger.info('user logout');
    // try {

    // } catch (err) {
    //     Logger.error('login')
    // } 

    res.send('user logged out!');
};
