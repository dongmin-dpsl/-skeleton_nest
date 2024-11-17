import { EntityRepository } from '@mikro-orm/postgresql';
import { Post } from './post.entity';
import { PostModel, CreatePostCommand } from 'src/domain/post.model';

export class PostRepository extends EntityRepository<Post> {
  async createPost(createPostCommand: CreatePostCommand): Promise<PostModel> {
    const entity = await this.create(createPostCommand);
    await this.em.flush();

    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    };
  }
}
