import { UserOsCommandPort } from 'src/domain/port/out/user.os.command.port';
import { UserOsQueryPort } from '../../domain/port/out/user.os.query.port';
import { UserModel } from 'src/domain/user.model';
import {
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
} from '../../domain/port/in/user.usecase';
import { OpenSearch } from '../../common/lib/opensearch';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserOsQueryPort, UserOsCommandPort {
  constructor(private openSearch: OpenSearch) {}

  async createUser(createUserCommand: CreateUserCommand): Promise<string> {
    const body = {
      email: createUserCommand.email,
      first_name: createUserCommand.firstName,
      last_name: createUserCommand.lastName,
      gender: createUserCommand.gender,
      ip_address: createUserCommand.ipAddress,
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
      email: updateUserCommand.email,
      first_name: updateUserCommand.firstName,
      last_name: updateUserCommand.lastName,
      gender: updateUserCommand.gender,
      ip_address: updateUserCommand.ipAddress,
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
        UserEntity.first_name._,
        UserEntity.last_name._,
        UserEntity.email._,
        UserEntity.gender._,
        UserEntity.ip_address._,
      ],
    };

    const res = await this.openSearch.search({
      index: UserEntity.alias,
      body: query,
    });

    return res.hits.hits.map(({ _id, _source }) => {
      return {
        id: _id,
        firstName: _source.first_name,
        lastName: _source.last_name,
        email: _source.email,
        gender: _source.gender,
        ipAddress: _source.ip_address,
      };
    });
  }

  async findOneById(id: string): Promise<UserModel> {
    const query = {
      size: 1,
      _source: [
        UserEntity.first_name._,
        UserEntity.last_name._,
        UserEntity.email._,
        UserEntity.gender._,
        UserEntity.ip_address._,
      ],
      query: { term: { _id: { value: id } } },
    };

    const res = await this.openSearch.search({
      index: UserEntity.alias,
      body: query,
    });

    const user = res.hits.hits[0]?._source;

    return {
      id: res.hits.hits[0]?._id,
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      gender: user?.gender,
      ipAddress: user?.ip_address,
    };
  }
}
