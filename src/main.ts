import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';

import 'dotenv/config';

import { AppConfig } from './config/app.config';
import { loggerConfig } from './lib/logger';
import { bootstrap } from './app';
import { AppModule } from './app.module';

async function run() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig()),
    // bodyParser: false, // Disable body parsing to handle it manually
  });

  const logger = new Logger('App');

  try {
    bootstrap(app);
    const port = app
      .get(ConfigService<AppConfig, true>)
      .get('api.port', { infer: true }); // .get('API_PORT');
    await app.listen(port);
    logger.log(`Application started on port: ${port}`);
  } catch (error) {
    console.error(error);
    logger.error('Application crashed', {
      error,
    });
  }
}

run().catch((error: Error) => {
  console.error('Failed to start Cal Platform API', { error: error.stack });
  process.exit(1);
});
