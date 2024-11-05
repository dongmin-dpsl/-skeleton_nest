import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from 'src/entity/post.repository';
import { Post } from 'src/entity/post.entity';
import { wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class PostService {
constructor(
  private readonly em: EntityManager,
  private readonly postRepo: PostRepository
){}

  async create(createPostDto: CreatePostDto):Promise<Post> {
    const{title, content,writter} = createPostDto;
    const post = await this.postRepo.create({title, content,writter});
    await this.em.flush()
    return post;
  }

  async findAll() {
    const post = await this.postRepo.findAll();
    return post;

  }

  async findOne(id: number) {
    const post = await this.postRepo.findOne(id);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepo.nativeUpdate({id}, updatePostDto);
    
    return updatePostDto;
  }

  async remove(id: number) {
    return this.postRepo.nativeDelete({id});
  }
}
