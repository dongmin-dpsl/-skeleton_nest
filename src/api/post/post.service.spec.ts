import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from '@mikro-orm/postgresql';

import { describe } from 'node:test';

import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostRepository } from '../../entity/post.repository';
import { Post } from 'src/entity/post.entity';

describe('PostService', () => {
  let service: PostService;
  let postRepo: PostRepository;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PostRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            nativeUpdate: jest.fn(),
            nativeDelete: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            flush: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
    postRepo = module.get<PostRepository>(PostRepository);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('신규 게시물이 반환되어야 한다.', async () => {
      const createPostDto: CreatePostDto = {
        title: '제목',
        content: '내용',
        writer: '작성자',
      };
      const post: Post = { id: 1, ...createPostDto };

      jest.spyOn(postRepo, 'create').mockReturnValue(post);
      jest.spyOn(em, 'flush').mockResolvedValue();

      const result = await service.create(createPostDto);

      expect(result).toEqual(post);
      expect(postRepo.create).toHaveBeenCalledWith(createPostDto);
      expect(em.flush).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('게시물이 여러개인 경우 여러개가 반환되어야 한다.', async () => {
      const posts: Post[] = [
        { id: 1, title: '제목', content: '내용', writer: '작성자' },
        { id: 2, title: '제목1', content: '내용1', writer: '작성자1' },
      ];

      jest.spyOn(postRepo, 'findAll').mockResolvedValue(posts);

      const result = await service.findAll();
      expect(result).toEqual(posts);
    });

    it('게시물이 없는 경우 빈 배열을 반화하여야 한다.', async () => {
      const posts: Post[] = [];

      jest.spyOn(postRepo, 'findAll').mockResolvedValue(posts);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('게시물이 존재하는 경우 게시물을 반환하여야 한다.', async () => {
      const post: Post = {
        id: 1,
        title: '제목',
        content: '내용',
        writer: '작성자',
      };

      jest.spyOn(postRepo, 'findOne').mockResolvedValue(post);

      const result = await service.findOne(1);

      expect(result).toEqual(post);
    });

    it('게시물이 없는경우 null을 반환하여야 한다.', async () => {
      const post: Post = null;

      jest.spyOn(postRepo, 'findOne').mockResolvedValue(post);

      const result = await service.findOne(1);

      expect(result).toEqual(post);
    });
  });
});
