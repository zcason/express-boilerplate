import { getClient } from '@Knexfile';
import { logger } from '@Utils';


const Logger = logger.child({ component: 'postgres-migrations' });
async function migrateLatest() {
    const pg = getClient();
    Logger.info('checking...');

    try {
        await pg.migrate.latetest();
        Logger.info('successful');
    } catch (err) {
        Logger.error('failure', err);
        throw new Error('migration error');
    }
};


export { migrateLatest };