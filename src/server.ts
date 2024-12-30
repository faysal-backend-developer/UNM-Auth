import app from './app';
import config from './config';
import dbConnection from './db';
import { errorLogger, logger } from './utils/winston/logger';
import { Server } from 'http';

process.on('uncaughtException', (error) => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
const run = async () => {
  try {
    await dbConnection(config.db_url as string);
    server = app.listen(
      config.port,

      () => {
        logger.info('Server is listening');
      },
    );
  } catch (error) {
    errorLogger.error(error);
  }

  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
};

run();

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM signal received.');
//   if (server) {
//     server.close();
//   }
// });
