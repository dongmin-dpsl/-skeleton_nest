import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { postgresConfig } from './common/config/mikro-orm.postgres.config';
import { envConfig } from './common/config/env.config';
import { Post } from './database/postgresql/post.entity';
import { UserModule } from './common/module/user.module';
import { PostModule } from './common/module/post.module';
import { LoggerMiddleware } from './common/helper/logger';

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
