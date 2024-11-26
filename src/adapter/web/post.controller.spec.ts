import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostModel } from '../../domain/post.model';
import {
  CreatePostCommand,
  FindPostListCommand,
  PostUseCase,
  UpdatePostCommand,
} from '../../application/port/in/post.usecase';

describe('PostController', () => {
  let controller: PostController;
  let postUseCase: PostUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: 'PostUseCase',
          useValue: {
            registerPost: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
          },
        },
      ],
    }).compile();

    postUseCase = module.get<PostUseCase>('PostUseCase');

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerPost', () => {
    it('should be defined', () => {
      const createPostCommand: CreatePostCommand = {
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      const post: PostModel = {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      jest.spyOn(postUseCase, 'registerPost').mockResolvedValue(post);

      expect(controller.create(createPostCommand)).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      const findPostListCommand: FindPostListCommand = {
        from: 0,
        size: 10,
      };

      const posts: PostModel[] = [
        {
          id: 1,
          title: '제목',
          content: '내용',
          writer: '작성자',
        },
      ];

      jest.spyOn(postUseCase, 'findAll').mockResolvedValue(posts);

      expect(controller.findAll(findPostListCommand)).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      const id: string = '1';

      const post: PostModel = {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      jest.spyOn(postUseCase, 'findOne').mockResolvedValue(post);

      expect(controller.findOne(id)).toBeDefined();
    });
  });

  describe('updatePost', () => {
    it('should be defined', () => {
      const id: string = '1';
      const updatePostCommand: UpdatePostCommand = {
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      const post: PostModel = {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      jest.spyOn(postUseCase, 'updatePost').mockResolvedValue(post);

      expect(controller.update(id, updatePostCommand)).toBeDefined();
    });
  });

  describe('deletePost', () => {
    it('should be defined', () => {
      const id: string = '1';

      jest.spyOn(postUseCase, 'deletePost').mockResolvedValue();

      expect(controller.remove(id)).toBeDefined();
    });
  });
});
