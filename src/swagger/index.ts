import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function generateSwagger(app: NestExpressApplication) {
  const logger = new Logger('App');
  logger.log(`Generating Swagger documentation...\n`);

  const config = new DocumentBuilder()
    .setTitle('Cal.com API v2')
    .setDescription('Cal.com API documentation')
    .setVersion('2.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
}
