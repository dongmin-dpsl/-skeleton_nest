import { UserOsCommandPort, UserOsQueryPort } from '../../application/port/out';
import { UserModel } from '../../domain';
import {
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
} from '../../application/port/in/user.usecase';
import { OpenSearch } from '../../application/common/opensearch';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserOsQueryPort, UserOsCommandPort {
  constructor(private openSearch: OpenSearch) {}

  async createUser(createUserCommand: CreateUserCommand): Promise<string> {
    const body = {
      [UserEntity.email._]: createUserCommand.email,
      [UserEntity.firstName._]: createUserCommand.firstName,
      [UserEntity.lastName._]: createUserCommand.lastName,
      [UserEntity.gender._]: createUserCommand.gender,
      [UserEntity.ipAddress._]: createUserCommand.ipAddress,
    };

    const res = await this.openSearch.index({
      index: UserEntity.alias,
      body: body,
      refresh: true,
    });

    return res._id;
  }

  async updateUser(
    id: string,
    updateUserCommand: UpdateUserCommand,
  ): Promise<boolean> {
    const body = {
      [UserEntity.email._]: updateUserCommand.email,
      [UserEntity.firstName._]: updateUserCommand.firstName,
      [UserEntity.lastName._]: updateUserCommand.lastName,
      [UserEntity.gender._]: updateUserCommand.gender,
      [UserEntity.ipAddress._]: updateUserCommand.ipAddress,
    };

    await this.openSearch.update({
      index: UserEntity.alias,
      id: id,
      body: body,
      refresh: true,
    });

    return true;
  }

  async deleteUser(id: string): Promise<void> {
    const query = { term: { _id: { value: id } } };

    await this.openSearch.deleteByQuery({
      index: UserEntity.alias,
      body: { query },
      refresh: true,
    });
  }

  async findAll(
    findUserListCommand: FindUserListCommand,
  ): Promise<UserModel[]> {
    const query = {
      from: findUserListCommand.from,
      size: findUserListCommand.size,
      _source: [
        UserEntity.firstName._,
        UserEntity.lastName._,
        UserEntity.email._,
        UserEntity.gender._,
        UserEntity.ipAddress._,
      ],
    };

    const res = await this.openSearch.search({
      index: UserEntity.alias,
      body: query,
    });

    return res.hits.hits.map(
      ({ _id, _source }) => new UserModel({ id: _id, ..._source }),
    );
  }

  async findOneById(id: string): Promise<UserModel> {
    const query = {
      size: 1,
      _source: [
        UserEntity.firstName._,
        UserEntity.lastName._,
        UserEntity.email._,
        UserEntity.gender._,
        UserEntity.ipAddress._,
      ],
      query: { term: { _id: { value: id } } },
    };

    const res = await this.openSearch.search({
      index: UserEntity.alias,
      body: query,
    });

    const doc = res.hits.hits[0];

    return new UserModel({ id: doc._id, ...doc._source });
  }
}
