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
import { PostService } from '../../domain/post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostUseCase } from 'src/domain/post.usecase';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
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
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postService.remove(+id);
  }
}
