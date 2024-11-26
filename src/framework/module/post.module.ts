import { Module } from '@nestjs/common';
import { PostService } from '../../application/service/post.service';
import { PostController } from '../../adapter/web/post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from '../../adapter/postgresql/post.entity';
import { PostGateway } from '../../adapter/postgresql/post.gateway';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'PostUseCase',
      useClass: PostService,
    },
    {
      provide: 'PostDbCommandPort',
      useClass: PostGateway,
    },
    {
      provide: 'PostDbQueryPort',
      useClass: PostGateway,
    },
  ],
})
export class PostModule {}
