import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ResponseInterceptor } from './interceptors/request-id.interceptor';
import { AppLoggerMiddleware } from './middlewares/app.logger.middleware';
import { JsonBodyMiddleware } from './middlewares/body/json.body.middleware';
import { RequestIdMiddleware } from './middlewares/request-id.middleware';
import { EndpointsModule } from './modules/endpoints.module';
import { AppController } from './app.controller';

import { appConfig } from '@/config/app.config';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JsonBodyMiddleware)
      .forRoutes('*')
      .apply(RequestIdMiddleware)
      .forRoutes('*')
      .apply(AppLoggerMiddleware)
      .forRoutes('*');
  }
}
