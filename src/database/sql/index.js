import { join } from 'node:path';
import pgPromise from 'pg-promise';

import { logger } from '@Utils';


const Logger = logger.child({ component: 'SQL' });
function sql(file) {
  const fullPath = join(__dirname, file);
  const options = {

    //When in debug mode, the query file is checked for its last modification time on every query request,
    //so if it changes, the file is read afresh.
    //The default for this property is true when NODE_ENV = development, or false otherwise.
    debug: true,

    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    // params: {
    //   schema: 'metrics' // replace ${schema~} with "metrics" // change to relvant tomus tables or db
    // }
  };

  const qf = new pgPromise.QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    Logger.error(`${JSON.stringify(qf.error)}`);
  }

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
  return qf;
}

// example import/export
export const sqlFileName = sql('./sqlFileName.sql');
