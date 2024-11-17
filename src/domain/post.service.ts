import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/helper/message/error.message';
import { PostModel } from './post.model';
import {
  CreatePostCommand,
  PostUseCase,
  UpdatePostCommand,
} from './port/in/post.usecase';
import { PostDbCommandPort } from './port/out/post.db.command.port';
import { PostDbQueryPort } from './port/out/post.db.query.port';

@Injectable()
export class PostService implements PostUseCase {
  constructor(
    @Inject('PostDbCommandPort')
    private readonly postDbCommandPort: PostDbCommandPort,
    @Inject('PostDbQueryPort')
    private readonly postDbQueryPort: PostDbQueryPort,
  ) {}

  async registerPost(createPostCommand: CreatePostCommand): Promise<PostModel> {
    const post = await this.postDbCommandPort.createPost(createPostCommand);
    return post;
  }

  async findAll(): Promise<PostModel[]> {
    const post = await this.postDbQueryPort.findAll();
    return post;
  }

  async findOne(id: number): Promise<PostModel> {
    const post = await this.postDbQueryPort.findOne(id);
    if (post === null) {
      throw new NotFoundException(ErrorMessage.NOT_FOUND_POST);
    }
    return post;
  }

  async updatePost(
    id: number,
    updatePostCommand: UpdatePostCommand,
  ): Promise<PostModel> {
    const post = await this.postDbCommandPort.updatePost(id, updatePostCommand);

    return post;
  }

  async deletePost(id: number): Promise<void> {
    await this.postDbCommandPort.deletePost(id);
  }
}
