import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { OpenSearch } from '../../lib/opensearch';
import { UserInfo } from '../controller/user/dto/response-type.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '../controller/user/dto/update-user.dto';
import { CreateUserDto } from '../controller/user/dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let openSearch: OpenSearch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: OpenSearch,
          useValue: {
            index: jest.fn(),
            search: jest.fn(),
            update: jest.fn(),
            deleteByQuery: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    openSearch = module.get<OpenSearch>(OpenSearch);
  });

  it('should be return User Object', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('데이터가 존재하면 배열로 반환하여야 한다.', async () => {
      const from: number = 0;
      const size: number = 2;

      const searchRes: any = Promise.resolve({
        hits: {
          total: {
            value: 2,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'user',
              _id: 'oZ7RAZMBav9dzgrUZV73',
              _score: 1,
              _source: {
                email: 'test@naver.com',
                first_name: 'kim',
                gender: 'man',
                id: '1',
                ip_address: '192.0.0.1',
                last_name: 'dong-dong',
              },
            },
            {
              _index: 'user',
              _id: 'op7RAZMBav9dzgrUp16q',
              _score: 1,
              _source: {
                email: 'test1@naver.com',
                first_name: 'kim1',
                gender: 'man',
                id: '2',
                ip_address: '192.0.0.4',
                last_name: 'dong-jeon',
              },
            },
          ],
        },
      });

      const users: UserInfo[] = [
        {
          email: 'test@naver.com',
          firstName: 'kim',
          id: '1',
          lastName: 'dong-dong',
        },
        {
          email: 'test1@naver.com',
          firstName: 'kim1',
          id: '2',
          lastName: 'dong-jeon',
        },
      ];

      jest.spyOn(openSearch, 'search').mockReturnValue(searchRes);

      const result = await service.findAll(from, size);

      expect(result.count).toBe(2);
      expect(result.users).toMatchObject(users);
    });

    it('데이터가 없으면 빈 배열을 반환하여야 한다.', async () => {
      const from: number = 0;
      const size: number = 2;
      const searchRes: any = Promise.resolve({
        hits: {
          total: {
            value: 0,
            relation: 'eq',
          },
          max_score: 1,
          hits: [],
        },
      });

      jest.spyOn(openSearch, 'search').mockReturnValue(searchRes);
      const result = await service.findAll(from, size);

      expect(result.count).toBe(0);
      expect(result.users).toMatchObject([]);
    });
  });

  describe('update', () => {
    it('변경할 데이터가 존재하지 않는다면 404를 반환한다.', async () => {
      const docId: string = 'f2dsaaf354';
      const updateUserDto: any = {
        email: 'emailString@naver.com',
        firstName: 'firstNameString',
        gender: 'genderString',
        id: 'idString',
        ipAddress: 'ipAddressString',
        lastName: 'lastNameString',
      };

      jest
        .spyOn(openSearch, 'update')
        .mockRejectedValue(new NotFoundException());

      await expect(service.update(docId, updateUserDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('변경할 데이터가 존재하면 변경 후 true를 반환한다.', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'test1@naver.com',
        firstName: 'kim1',
        gender: 'man',
        id: '2',
        ipAddress: '192.0.0.4',
        lastName: 'dong-jeon',
      };

      const docId: string = 'op7RAZMBav9dzgrUp16q';
      const searchRes: any = Promise.resolve({
        hits: {
          total: {
            value: 1,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'user',
              _id: 'op7RAZMBav9dzgrUp16q',
              _score: 1,
              _source: {
                email: 'test1@naver.com',
                first_name: 'kim1',
                gender: 'man',
                id: '2',
                ip_address: '192.0.0.4',
                last_name: 'dong-jeon',
              },
            },
          ],
        },
      });

      jest.spyOn(openSearch, 'update').mockResolvedValue(searchRes);

      const result = await service.update(docId, updateUserDto);

      expect(result).toBeTruthy();
    });
  });

  describe('findOneById', () => {
    it('검색된 문서가 존재한다면 UserInfo형태로 반환하여야 한다.', async () => {
      const searchRes: any = Promise.resolve({
        hits: {
          total: {
            value: 1,
            relation: 'eq',
          },
          max_score: 1,
          hits: [
            {
              _index: 'user',
              _id: 'oZ7RAZMBav9dzgrUZV73',
              _score: 1,
              _source: {
                email: 'test@naver.com',
                first_name: 'kim',
                gender: 'man',
                id: '1',
                ip_address: '192.0.0.1',
                last_name: 'dong-dong',
              },
            },
          ],
        },
      });

      const docId: string = 'oZ7RAZMBav9dzgrUZV73';
      const user: UserInfo = {
        email: 'test@naver.com',
        firstName: 'kim',
        id: '1',
        lastName: 'dong-dong',
      };

      jest.spyOn(openSearch, 'search').mockResolvedValue(searchRes);

      const result = await service.findOneById(docId);

      expect(result).toMatchObject(user);
    });

    it('검색된 문서가 없다면 404에러를 반환하여야 한다.', async () => {
      const docId: string = 'oZ7RAZMBav9dzgrUZV73';

      jest
        .spyOn(openSearch, 'search')
        .mockRejectedValue(new NotFoundException());

      await expect(service.findOneById(docId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('데이터가 삭제되면 true를 반환한다.', async () => {
      const docId: any = 'oZ7RAZMBav9dzgrUZV73';

      jest.spyOn(openSearch, 'deleteByQuery').mockResolvedValue(docId);

      const result = await service.remove(docId);

      expect(result).toBeTruthy();
    });
  });

  describe('create', () => {
    it('추가된 데이터를 반환하여야 한다.', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test1@naver.com',
        firstName: 'kim1',
        gender: 'man',
        id: '2',
        ipAddress: '192.0.0.4',
        lastName: 'dong-jeon',
      };

      const searchRes: any = { _id: 'N_weB5MBitdao_hyZ2iW' };

      jest.spyOn(openSearch, 'index').mockResolvedValue(searchRes);

      const result = await service.createOne(createUserDto);

      expect(result).toBe(searchRes._id);
    });
  });
});
