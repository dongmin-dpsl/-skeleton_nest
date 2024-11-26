import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { postgresConfig } from './framework/database/mikro-orm.postgres.config';
import { envConfig } from './framework/config/env.config';
import { UserModule } from './framework/module/user.module';
import { PostModule } from './framework/module/post.module';
import { LoggerMiddleware } from './application/common/logger/logger';

@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    MikroOrmModule.forRootAsync(postgresConfig),
    PostModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
