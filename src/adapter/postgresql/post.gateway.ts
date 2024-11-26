import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Post } from './post.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { PostDbQueryPort } from '../../application/port/out/post.db.query.port';
import { PostDbCommandPort } from '../../application/port/out/post.db.command.port';
import { PostModel } from '../../domain/post.model';
import {
  CreatePostCommand,
  UpdatePostCommand,
} from '../../application/port/in/post.usecase';

@Injectable()
export class PostGateway implements PostDbCommandPort, PostDbQueryPort {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(Post)
    private readonly postRepo: EntityRepository<Post>,
  ) {}

  async findAll(): Promise<PostModel[]> {
    const entities = await this.postRepo.findAll();
    return entities.map((entity) => ({
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    }));
  }

  async findOne(id: number): Promise<PostModel> {
    const entity = await this.postRepo.findOneOrFail(id);
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    };
  }

  async updatePost(
    id: number,
    updatePostCommand: UpdatePostCommand,
  ): Promise<PostModel> {
    const entity = await this.postRepo.findOneOrFail(id);
    Object.assign(entity, updatePostCommand);
    await this.em.flush();
    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    };
  }

  async deletePost(id: number): Promise<void> {
    const entity = await this.postRepo.findOneOrFail(id);
    await this.em.removeAndFlush(entity);
  }

  async createPost(createPostCommand: CreatePostCommand): Promise<PostModel> {
    const entity = await this.postRepo.create(createPostCommand);
    await this.em.flush();

    return {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      writer: entity.writer,
    };
  }
}
