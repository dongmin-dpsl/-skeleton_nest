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
import {
  CreatePostCommand,
  PostUseCase,
  UpdatePostCommand,
} from '../../domain/port/in/post.usecase';

@Controller('post')
export class PostController {
  constructor(
    @Inject('PostUseCase')
    private readonly postUseCase: PostUseCase,
  ) {}

  @Post()
  async create(@Body() createPostCommand: CreatePostCommand) {
    return await this.postUseCase.registerPost(createPostCommand);
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
    @Body() updatePostCommand: UpdatePostCommand,
  ) {
    return this.postUseCase.updatePost(+id, updatePostCommand);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.postUseCase.deletePost(+id);
  }
}
