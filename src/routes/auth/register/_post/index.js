import { logger } from '@Utils';

/**  login registration content 
 req.body {
  emai: @type {sting}
  phone_number: @type {number} optional
  password_hash: @type {string} 
  password_salt: @type {string}
 }
*/


const Logger = logger.child({ component: 'route' });
export default function (req, res) {
    Logger.info('user registering');

    res.send('user registed!'); 
};
