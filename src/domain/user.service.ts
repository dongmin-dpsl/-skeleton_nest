import { Inject, Injectable } from '@nestjs/common';
import {
  UserUseCase,
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
} from './port/in/user.usecase';
import { UserOsCommandPort } from './port/out/user.os.command.port';
import { UserOsQueryPort } from './port/out/user.os.query.port';
import { UserModel } from './user.model';

@Injectable()
export class UserService implements UserUseCase {
  constructor(
    @Inject('UserOsCommandPort')
    private readonly userOsCommandPort: UserOsCommandPort,
    @Inject('UserOsQueryPort')
    private readonly userOsQueryPort: UserOsQueryPort,
  ) {}

  async findUser(id: string): Promise<UserModel> {
    const user = await this.userOsQueryPort.findOneById(id);

    return user;
  }

  async createUser(createUserCommand: CreateUserCommand): Promise<string> {
    const id = await this.userOsCommandPort.createUser(createUserCommand);

    return id;
  }

  async findUserList(
    findUserListCommand: FindUserListCommand,
  ): Promise<UserModel[]> {
    const users = await this.userOsQueryPort.findAll(findUserListCommand);

    return users;
  }

  async updateUser(
    id: string,
    updateUserCommand: UpdateUserCommand,
  ): Promise<string> {
    await this.userOsCommandPort.updateUser(id, updateUserCommand);

    return id;
  }

  async deleteUser(id: string): Promise<string> {
    await this.userOsCommandPort.deleteUser(id);

    return id;
  }
}
