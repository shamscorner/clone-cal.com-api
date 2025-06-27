import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from '@/config/app.config';

import { AppLoggerMiddleware } from './middlewares/app.logger.middleware';
import { JsonBodyMiddleware } from './middlewares/json.body.middleware';
import { EndpointsModule } from './modules/endpoints.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      isGlobal: true,
      load: [appConfig],
    }),
    EndpointsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
      .apply(AppLoggerMiddleware)
      .forRoutes('*');
  }
}
