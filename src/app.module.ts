import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from '@/config/app.config';

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
export class AppModule {}
