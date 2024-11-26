import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { CreatePostCommand, UpdatePostCommand } from '../port/in/post.usecase';
import { PostModel } from '../../domain';
import { PostDbCommandPort, PostDbQueryPort } from '../port/out';

describe('PostService', () => {
  let service: PostService;
  let postDbCommandPort: PostDbCommandPort;
  let postDbQueryPort: PostDbQueryPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: 'PostDbCommandPort',
          useValue: {
            createPost: jest.fn(),
            updatePost: jest.fn(),
            deletePost: jest.fn(),
          },
        },
        {
          provide: 'PostDbQueryPort',
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postDbCommandPort = module.get<PostDbCommandPort>('PostDbCommandPort');
    postDbQueryPort = module.get<PostDbQueryPort>('PostDbQueryPort');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('신규 게시물이 반환되어야 한다.', async () => {
      const createPostCommand: CreatePostCommand = {
        title: '제목',
        content: '내용',
        writer: '작성자',
      };
      const post: PostModel = {
        id: 1,
        ...createPostCommand,
      };

      jest.spyOn(postDbCommandPort, 'createPost').mockResolvedValue(post);

      const result = await service.registerPost(createPostCommand);

      expect(result).toEqual(post);
      expect(postDbCommandPort.createPost).toHaveBeenCalledWith(
        createPostCommand,
      );
    });
  });

  describe('findAll', () => {
    it('게시물이 여러개인 경우 여러개가 반환되어야 한다.', async () => {
      const posts: PostModel[] = [
        { id: 1, title: '제목', content: '내용', writer: '작성자' },
        { id: 2, title: '제목1', content: '내용1', writer: '작성자1' },
      ];

      jest.spyOn(postDbQueryPort, 'findAll').mockResolvedValue(posts);

      const result = await service.findAll();
      expect(result).toEqual(posts);
    });

    it('게시물이 없는 경우 빈 배열을 반환하여야 한다.', async () => {
      const posts: PostModel[] = [];

      jest.spyOn(postDbQueryPort, 'findAll').mockResolvedValue(posts);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('게시물이 존재하는 경우 게시물을 반환하여야 한다.', async () => {
      const post: PostModel = {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      jest.spyOn(postDbQueryPort, 'findOne').mockResolvedValue(post);

      const result = await service.findOne(1);

      expect(result).toEqual(post);
    });
  });

  describe('update', () => {
    it('업데이트되는 변경된 게시물이 반환되어야 한다.', async () => {
      const id: number = 1;
      const post: UpdatePostCommand = {
        title: '제목',
        content: '내용',
        writer: '작성자',
      };
      const postModel: PostModel = { id: 1, ...post };

      jest.spyOn(postDbCommandPort, 'updatePost').mockResolvedValue(postModel);

      const result = await service.updatePost(id, post);

      expect(result).toEqual(postModel);
    });
  });
});
