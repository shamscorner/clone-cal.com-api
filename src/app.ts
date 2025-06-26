import { VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request } from 'express';
import {
  API_VERSIONS,
  API_VERSIONS_ENUM,
  CAL_API_VERSION_HEADER,
  VERSION_2024_04_15,
} from './constants/api';

export const bootstrap = (
  app: NestExpressApplication,
): NestExpressApplication => {
  app.enableShutdownHooks();

  app.enableVersioning({
    type: VersioningType.CUSTOM,
    extractor: (request: unknown) => {
      const headerVersion = (request as Request)?.headers[
        CAL_API_VERSION_HEADER
      ] as string | undefined;

      if (
        headerVersion &&
        API_VERSIONS.includes(headerVersion as API_VERSIONS_ENUM)
      ) {
        return headerVersion;
      }

      return VERSION_2024_04_15;
    },
    defaultVersion: VERSION_2024_04_15,
  });

  if (process?.env?.API_GLOBAL_PREFIX) {
    app.setGlobalPrefix(process?.env?.API_GLOBAL_PREFIX);
  }

  return app;
};
