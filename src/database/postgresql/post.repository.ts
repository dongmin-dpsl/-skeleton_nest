import { EntityRepository } from '@mikro-orm/postgresql';
import { Post } from './post.entity';
import { PostModel, RegisterPost } from 'src/domain/post.model';

export class PostRepository extends EntityRepository<Post> {
  async createPost(registerPost: RegisterPost): Promise<PostModel> {
    const entity = await this.create(registerPost);
    await this.em.flush();

    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    };
  }
}
