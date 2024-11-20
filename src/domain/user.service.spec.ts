import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import {
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
} from './port/in/user.usecase';
import { UserOsQueryPort } from './port/out/user.os.query.port';
import { UserOsCommandPort } from './port/out/user.os.command.port';

describe('UserService', () => {
  let service: UserService;
  let userOsQueryPort: UserOsQueryPort;
  let userOsCommandPort: UserOsCommandPort;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserOsCommandPort',
          useValue: {
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: 'UserOsQueryPort',
          useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userOsQueryPort = module.get<UserOsQueryPort>('UserOsQueryPort');
    userOsCommandPort = module.get<UserOsCommandPort>('UserOsCommandPort');
  });

  it('should be return User Object', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('데이터가 존재하면 배열로 반환하여야 한다.', async () => {
      const from: number = 0;
      const size: number = 2;

      const users: UserModel[] = [
        {
          id: '1',
          email: 'test@naver.com',
          firstName: 'kim',
          gender: 'man',
          ipAddress: '192.0.0.1',
          lastName: 'dong-dong',
        },
        {
          id: '2',
          email: 'test1@naver.com',
          firstName: 'kim1',
          gender: 'man',
          ipAddress: '192.0.0.4',
          lastName: 'dong-jeon',
        },
      ];

      const findUserListCommand: FindUserListCommand = {
        from,
        size,
      };

      jest.spyOn(userOsQueryPort, 'findAll').mockResolvedValue(users);

      const result = await service.findUserList(findUserListCommand);

      expect(result.length).toBe(2);
      expect(result).toMatchObject(users);
    });

    it('데이터가 없으면 빈 배열을 반환하여야 한다.', async () => {
      const from: number = 0;
      const size: number = 2;

      jest.spyOn(userOsQueryPort, 'findAll').mockResolvedValue([]);

      const findUserListCommand: FindUserListCommand = {
        from,
        size,
      };

      const result = await service.findUserList(findUserListCommand);

      expect(result).toEqual([]);
    });
  });

  describe('updateUser', () => {
    it('변경할 데이터가 존재하면 변경 후 true를 반환한다.', async () => {
      const updateUserCommand: UpdateUserCommand = {
        email: 'test1@naver.com',
        firstName: 'kim1',
        gender: 'man',
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
                ip_address: '192.0.0.4',
                last_name: 'dong-jeon',
              },
            },
          ],
        },
      });

      jest.spyOn(userOsCommandPort, 'updateUser').mockResolvedValue(searchRes);

      const result = await service.updateUser(docId, updateUserCommand);

      expect(result).toBeTruthy();
    });
  });

  describe('findOneUser', () => {
    it('검색된 문서가 존재한다면 User형태로 반환하여야 한다.', async () => {
      const docId: string = 'oZ7RAZMBav9dzgrUZV73';
      const user: UserModel = {
        id: '1',
        email: 'test@naver.com',
        gender: 'man',
        ipAddress: '192.0.0.1',
        firstName: 'kim',
        lastName: 'dong-dong',
      };

      jest.spyOn(userOsQueryPort, 'findOneById').mockResolvedValue(user);

      const result = await service.findUser(docId);

      expect(result).toMatchObject(user);
    });
  });

  describe('deleteUser', () => {
    it('데이터가 삭제되면 true를 반환한다.', async () => {
      const docId: any = 'oZ7RAZMBav9dzgrUZV73';

      jest.spyOn(userOsCommandPort, 'deleteUser').mockResolvedValue(docId);

      const result = await service.deleteUser(docId);

      expect(result).toBeTruthy();
    });
  });

  describe('createUser', () => {
    it('추가된 데이터를 반환하여야 한다.', async () => {
      const createUserCommand: CreateUserCommand = {
        email: 'test1@naver.com',
        firstName: 'kim1',
        gender: 'man',
        ipAddress: '192.0.0.1',
        lastName: 'dong-dong',
      };

      const searchRes: string = 'N_weB5MBitdao_hyZ2iW';

      jest.spyOn(userOsCommandPort, 'createUser').mockResolvedValue(searchRes);

      const result = await service.createUser(createUserCommand);

      expect(result).toBe(searchRes);
    });
  });
});
