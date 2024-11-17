import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostUseCase } from '../../domain/port/in/post.usecase';

@Controller('post')
export class PostController {
  constructor(
    @Inject('PostUseCase')
    private readonly postUseCase: PostUseCase,
  ) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    const { title, content, writer } = createPostDto;
    return await this.postUseCase.registerPost({ title, content, writer });
  }

  @Get()
  findAll() {
    return this.postUseCase.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postUseCase.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const { title, content, writer } = updatePostDto;
    return this.postUseCase.updatePost(+id, { title, content, writer });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postUseCase.deletePost(+id);
  }
}
