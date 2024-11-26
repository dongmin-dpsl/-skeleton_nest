import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import {
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
  UserUseCase,
} from '../../application/port/in/user.usecase';
import { UserModel } from '../../domain/user.model';

describe('UserController', () => {
  let controller: UserController;
  let userUseCase: UserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: 'UserUseCase',
          useValue: {
            createUser: jest.fn(),
            findUserList: jest.fn(),
            findUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userUseCase = module.get<UserUseCase>('UserUseCase');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('유저가 생성되어야 한다.', async () => {
      const createUserCommand: CreateUserCommand = {
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        gender: 'gender',
        ipAddress: 'ipAddress',
      };

      const user: UserModel = {
        id: '1',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        gender: 'gender',
        ipAddress: 'ipAddress',
      };

      jest.spyOn(userUseCase, 'createUser').mockResolvedValue(user.id);
      jest.spyOn(userUseCase, 'findUser').mockResolvedValue(user);

      const result = await controller.create(createUserCommand);

      expect(result).toBeDefined();
      expect(userUseCase.findUser).toHaveBeenCalledWith(user.id);
    });
  });

  describe('findAll', () => {
    it('유저 목록을 조회할 수 있어야 한다.', () => {
      const findUserListCommand: FindUserListCommand = {
        from: 0,
        size: 10,
      };

      const users: UserModel[] = [
        {
          id: '1',
          email: 'email',
          firstName: 'firstName',
          gender: 'gender',
          ipAddress: 'ipAddress',
          lastName: 'lastName',
        },
      ];

      jest.spyOn(userUseCase, 'findUserList').mockResolvedValue(users);

      expect(controller.findAll(findUserListCommand)).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('유저를 조회할 수 있어야 한다.', async () => {
      const id = '1';

      const user: UserModel = {
        id: '1',
        email: 'email',
        firstName: 'firstName',
        gender: 'gender',
        ipAddress: 'ipAddress',
        lastName: 'lastName',
      };

      jest.spyOn(userUseCase, 'findUser').mockResolvedValue(user);

      const result = await controller.findOne(id);

      expect(result).toBeDefined();
    });
  });

  describe('update', () => {
    it('유저를 수정할 수 있어야 한다.', async () => {
      const id = '1';

      const updateUserCommand: UpdateUserCommand = {
        email: 'email',
        firstName: 'firstName',
        gender: 'gender',
        ipAddress: 'ipAddress',
        lastName: 'lastName',
      };

      const user: UserModel = {
        id: '1',
        email: 'email',
        firstName: 'firstName',
        gender: 'gender',
        ipAddress: 'ipAddress',
        lastName: 'lastName',
      };

      jest.spyOn(userUseCase, 'updateUser').mockResolvedValue(user.id);
      jest.spyOn(userUseCase, 'findUser').mockResolvedValue(user);

      const result = await controller.update(id, updateUserCommand);

      expect(result).toBeDefined();
      expect(userUseCase.findUser).toHaveBeenCalledWith(id);
    });
  });

  describe('delete', () => {
    it('유저를 삭제할 수 있어야 한다.', async () => {
      const id = '1';

      jest.spyOn(userUseCase, 'deleteUser').mockReturnValue(null);

      const result = await controller.remove(id);

      expect(result).toBeDefined();
    });
  });
});
