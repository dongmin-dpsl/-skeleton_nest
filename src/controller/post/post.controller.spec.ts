import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../../domain/post.service';

describe('PostController', () => {
  let controller: PostController;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    }).compile();

    postService = await module.resolve(PostService);

    // controller = module.get<PostController>(PostController);
    // postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
