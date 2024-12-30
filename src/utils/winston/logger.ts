import { createLogger, format, transports } from 'winston';

import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, prettyPrint } = format;
import path from 'path';
export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'right meow!' }), timestamp(), prettyPrint()),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log',
        'winston',
        'info',
        'UNM-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'right meow!' }), timestamp(), prettyPrint()),
  transports: [
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'log',
        'winston',
        'error',
        'UNM-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
  errorLogger.add(
    new transports.Console({
      format: format.simple(),
    }),
  );
}
