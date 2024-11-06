import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from '../../entity/post.repository';
import { Post } from '../../entity/post.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { ErrorMessage } from '../../helper/message/error.message';

@Injectable()
export class PostService {
  constructor(
    private readonly em: EntityManager,
    private readonly postRepo: PostRepository,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content, writer } = createPostDto;
    const post = await this.postRepo.create({ title, content, writer });
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
