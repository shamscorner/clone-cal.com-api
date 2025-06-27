import { getEnv } from '@/env';

export type AppConfig = {
  env: {
    type: 'production' | 'development';
  };
  api: {
    port: number;
    path: string;
    url: string;
    keyPrefix: string;
    globalPrefix?: string;
  };
  db: {
    readUrl: string;
    writeUrl: string;
  };
};

export const appConfig = (): AppConfig => {
  return {
    env: {
      type: getEnv('NODE_ENV', 'development'),
    },
    api: {
      port: Number(getEnv('API_PORT', '5555')),
      path: getEnv('API_URL', 'http://localhost'),
      url: `${getEnv('API_URL', 'http://localhost')}${
        process.env.API_PORT &&
        getEnv('NODE_ENV', 'development') === 'development'
          ? `:${Number(getEnv('API_PORT', '5555'))}`
          : ''
      }/${getEnv('API_GLOBAL_PREFIX', '/api')}/v1`,
      keyPrefix: getEnv('API_KEY_PREFIX', 'cal_'),
      globalPrefix: getEnv('API_GLOBAL_PREFIX', '/api'),
    },
    db: {
      readUrl: getEnv('DATABASE_READ_URL'),
      writeUrl: getEnv('DATABASE_WRITE_URL'),
    },
  };
};
