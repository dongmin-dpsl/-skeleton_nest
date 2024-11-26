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
  Req,
} from '@nestjs/common';
import {
  CreatePostCommand,
  FindPostListCommand,
  PostUseCase,
  UpdatePostCommand,
} from '../../application/port/in/post.usecase';

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
  findAll(@Req() findPostListCommand: FindPostListCommand) {
    return this.postUseCase.findAll(findPostListCommand);
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
