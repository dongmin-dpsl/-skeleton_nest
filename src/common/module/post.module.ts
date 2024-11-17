import { Module } from '@nestjs/common';
import { PostService } from '../../domain/post.service';
import { PostController } from '../../controller/post/post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from '../../database/postgresql/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'PostUseCase',
      useClass: PostService,
    },
  ],
})
export class PostModule {}
