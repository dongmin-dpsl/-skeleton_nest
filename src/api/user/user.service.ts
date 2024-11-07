import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../../template/openSearch/User';
import { OpenSearch } from '../../lib/opensearch';
import { UserInfo, UserList } from './dto/response-type.dto';
import { ErrorMessage } from '../../helper/message/error.message';

@Injectable()
export class UserService {
  constructor(private openSearch: OpenSearch) {}

  async createOne(createUserDto: CreateUserDto): Promise<string> {
    const { email, firstName, gender, id, ipAddress, lastName } = createUserDto;

    const body = {
      email: email,
      first_name: firstName,
      gender: gender,
      id: id,
      ip_address: ipAddress,
      last_name: lastName,
    };

    const esRes = await this.openSearch.index({
      index: User.alias,
      body: body,
    });

    return esRes._id;
  }

  /** 전체 데이터 리턴
   * @param from
   * @param size
   * @returns
   */
  async findAll(from: number, size: number): Promise<UserList> {
    const query = {
      from,
      size,
      _source: [User.id._, User.first_name._, User.last_name._, User.email._],
    };

    const esRes = await this.openSearch.search({
      index: User.alias,
      body: query,
    });

    const count = esRes.hits.total.value;
    const users: UserInfo[] = esRes.hits.hits.map(({ _source }) => ({
      id: _source.id,
      firstName: _source.first_name,
      lastName: _source.last_name,
      email: _source.email,
    }));

    return { count, users };
  }

  async findOneById(id: string): Promise<UserInfo> {
    const query = {
      size: 1,
      _source: [User.first_name._, User.last_name._, User.email._],
      query: { term: { _id: { value: id } } },
    };

    const esRes = await this.openSearch.search({
      index: User.alias,
      body: query,
    });

    const user = esRes.hits.hits[0]?._source;

    if (user === undefined)
      throw new NotFoundException(ErrorMessage.NOT_FOUND_USER);

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
    };
  }

  async update(docId: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    const { email, firstName, gender, id, ipAddress, lastName } = updateUserDto;

    const body = {
      email: email,
      first_name: firstName,
      gender: gender,
      id: id,
      ip_address: ipAddress,
      last_name: lastName,
    };

    await this.openSearch.update({
      index: User.alias,
      id: docId,
      body: { doc: body },
      refresh: true,
    });

    return true;
  }

  async remove(id: string): Promise<string> {
    const query = { term: { _id: { value: id } } };
    await this.openSearch.deleteByQuery({
      index: User.alias,
      body: { query },
      refresh: true,
    });

    return id;
  }
}
