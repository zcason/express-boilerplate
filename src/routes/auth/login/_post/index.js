import { logger } from '@Utils';


const Logger = logger.child({ component: 'route' });
export default function (req, res) {
    Logger.info('user logging in');
    // try {

    // } catch (err) {
    //     Logger.error('login')
    // } 

    res.send('user logged in!');
};
