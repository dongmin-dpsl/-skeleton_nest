import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePostDto } from '../controller/post/dto/update-post.dto';
import { PostRepository } from '../database/postgresql/post.repository';
import { EntityManager } from '@mikro-orm/postgresql';
import { ErrorMessage } from '../common/helper/message/error.message';
import { PostModel, RegisterPost } from './post.model';

import { PostUseCase } from './post.usecase';
@Injectable()
export class PostService implements PostUseCase {
  constructor(
    private readonly em: EntityManager,
    private readonly postRepo: PostRepository,
  ) {}

  async registerPost(registerPost: RegisterPost): Promise<PostModel> {
    const post = await this.postRepo.createPost(registerPost);
    await this.em.flush();
    return post;
  }

  async findAll() {
    const post = await this.postRepo.findAll();
    return post;
  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne(id);
    if (post === null) {
      throw new NotFoundException(ErrorMessage.NOT_FOUND_POST);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const postCount = await this.postRepo.nativeUpdate({ id }, updatePostDto);

    if (postCount === 0) {
      throw new NotFoundException(ErrorMessage.NOT_FOUND_POST);
    }
    return postCount === 1;
  }

  async remove(id: number) {
    await this.postRepo.nativeDelete({ id });
    return true;
  }
}
