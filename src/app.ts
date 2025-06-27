import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request } from 'express';

import { AppConfig } from './config/app.config';
import {
  API_VERSIONS,
  API_VERSIONS_ENUM,
  CAL_API_VERSION_HEADER,
  VERSION_2024_04_15,
} from './constants/api';
import { HttpExceptionFilter } from './filters/http-exception.filter';

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

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory(errors: ValidationError[]) {
        return new BadRequestException({ errors });
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const apiGlobalPrefix = app
    .get(ConfigService<AppConfig, true>)
    .get('api.globalPrefix', { infer: true });

  if (apiGlobalPrefix) {
    app.setGlobalPrefix(apiGlobalPrefix);
  }

  return app;
};
