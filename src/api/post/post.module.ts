import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Post } from 'src/entity/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
