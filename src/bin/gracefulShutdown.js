import { hrtime } from 'node:process';
import { logger } from '@Utils';


/**
 * Graceful shutdown of the node process 
 *
 * periodSeconds -- periodically probe when to force close connections -- default: 1000 (1 second)
 * timeoutThreshold -- number of attempts before forcing connections to close -- default: 2
 * TOTAL TIME to wait for sockets to close = periodSeconds * timeoutThreshold -- default: 2 seconds
 */
const periodSeconds = Number(process.env.SHUTDOWN_PEROID_SECONDS);
const timeoutThreshold = Number(process.env.SHUTDOWN_TIME_THRESHOLD);
const sockets = {};
let nextSocketId = 0;
let shutDownInitiatedStartTime;

const Logger = logger.child({ component: 'graceful-shutdown' });
function gracefulShutdown(server) {
  server.on('connection', socket => {
    const socketId = nextSocketId++;

    sockets[socketId] = socket;

    socket.once('close', () => {
      delete sockets[socketId];
    });
  });

  function waitForSocketsToClose(timeout) {
    if (timeout > 0) return setTimeout(waitForSocketsToClose, periodSeconds, timeout - 1);

    Logger.warn(`Forcing ${Object.keys(sockets).length} connections to close now`);
    for (const socketId in sockets) {
      sockets[socketId].destroy();
    }
  }

  function shutdown() {
    waitForSocketsToClose(timeoutThreshold);

    server.close(err => {
      if (err) {
        Logger.error(err);
        return process.exitCode = 1;
      }

      const endTime = hrtime.bigint();
      const responseTime = Number(endTime - shutDownInitiatedStartTime) * Math.pow(10, -6); // convert from nanoseconds to milliseconds
      const val = responseTime.toFixed(3);

      Logger.info(`Shutdown duration: ${val}ms`);
      process.exit();
    });
  }

  process.on('SIGINT', () => {
    Logger.info(`SIGINT (aka ctrl-c in docker) @ ${new Date().toISOString()}`);
    Logger.info(`Closing ${Object.keys(sockets).length} connections`);
    Logger.info(`Total wait time before FORCING connections to close: ${(timeoutThreshold * periodSeconds) / 1000} seconds`);

    shutDownInitiatedStartTime = hrtime.bigint();
    shutdown();
  });

  process.on('SIGTERM', () => {
    Logger.info(`SIGTERM (docker container stop) @ ${new Date().toISOString()}`);
    Logger.info(`Closing ${Object.keys(sockets).length} connections`);
    Logger.info(`Total wait time before FORCING connections to close: ${(timeoutThreshold * periodSeconds) / 1000} seconds`);

    shutDownInitiatedStartTime = hrtime.bigint();
    shutdown();
  });

  process.on('unhandledRejection', (reason, p) => {
    Logger.error(`Unhandled Rejection because of ${reason}`, { p });
  });
}


export default gracefulShutdown;
