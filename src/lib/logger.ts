import type { LoggerOptions } from 'winston';
import type Transport from 'winston-transport';
import { format, transports as Transports, config } from 'winston';

export const logLevels = config.npm.levels;

const colorizer = format.colorize({
  colors: config.npm.colors,
});

const formattedTimestamp = format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss.SSS',
});

const WINSTON_DEV_FORMAT = format.combine(
  format.errors({ stack: true }),
  colorizer,
  formattedTimestamp,
  format.simple(),
);

const WINSTON_PROD_FORMAT = format.combine(
  format.errors({ stack: true }),
  formattedTimestamp,
  format.json(),
);

export function loggerConfig(): LoggerOptions {
  const isProduction = process.env.NODE_ENV === 'production';

  const transports: Transport[] = [];
  transports.push(new Transports.Console());

  return {
    levels: logLevels,
    level: process.env.LOG_LEVEL ?? 'info',
    format: isProduction ? WINSTON_PROD_FORMAT : WINSTON_DEV_FORMAT,
    transports,
    exceptionHandlers: transports,
    rejectionHandlers: transports,
    defaultMeta: {
      service: 'cal-platform-api',
    },
  };
}
