import { PostModule } from './api/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { postgresConfig } from './config/mikro-orm.postgres.config';
import { envConfig } from './config/env.config';
import { Post } from './entity/post.entity';
import { LoggerMiddleware } from './helper/logger';
@Module({
  imports: [
    ConfigModule.forRoot(envConfig),
    MikroOrmModule.forRootAsync(postgresConfig),
    MikroOrmModule.forFeature([Post]),
    PostModule,
  ],
  controllers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
