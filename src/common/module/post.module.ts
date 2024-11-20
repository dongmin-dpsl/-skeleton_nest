import { Module } from '@nestjs/common';
import { PostService } from '../../domain/post.service';
import { PostController } from '../../controller/post/post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from '../../database/postgresql/post.entity';
import { PostRepository } from 'src/database/postgresql/post.repository';

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
      useClass: PostRepository,
    },
    {
      provide: 'PostDbQueryPort',
      useClass: PostRepository,
    },
  ],
})
export class PostModule {}
