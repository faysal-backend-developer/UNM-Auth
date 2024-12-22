import app from './app';
import config from './config';
import dbConnection from './db';
import { errorLogger, logger } from './utils/winston/logger';

const run = async () => {
  try {
    await dbConnection(config.db_url as string);
    app.listen(
      config.port,

      () => {
        logger.info('Server is listening');
      },
    );
  } catch (error) {
    errorLogger.error(error);
  }
};

run();
