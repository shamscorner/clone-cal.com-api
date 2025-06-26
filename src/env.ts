import { logLevels } from '@/lib/logger';

export type Environment = {
  NODE_ENV: 'development' | 'production';
  LOG_LEVEL: keyof typeof logLevels;
  API_PORT: string;
  API_URL: string;
  API_KEY_PREFIX: string;
  API_GLOBAL_PREFIX: string;
};

export const getEnv = <K extends keyof Environment>(
  key: K,
  fallback?: Environment[K] | false,
): Environment[K] => {
  const value = process.env[key] as Environment[K] | undefined;

  if (value === undefined) {
    // handle fallback falsy cases that should still be used as value
    if (fallback === false || fallback === '' || fallback === 0) {
      return fallback as Environment[K];
    }
    if (fallback) {
      return fallback;
    }
    throw new Error(`Missing environment variable: ${key}.`);
  }

  return value;
};
