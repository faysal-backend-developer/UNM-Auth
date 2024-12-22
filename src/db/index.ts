import mongoose from 'mongoose';
import { errorLogger, logger } from '../utils/winston/logger';

const dbConnection = async (url: string): Promise<void> => {
  try {
    await mongoose.connect(url as string);
    logger.info(`Connected to ${url}`);
  } catch (error) {
    errorLogger.error(`Failed to connect to`, error);
  }
};

export default dbConnection;
