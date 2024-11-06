import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { openSearch } from 'src/config/opensearch.config';
import { User } from 'src/template/openSearch/User';
import { OpenSearch } from 'src/lib/opensearch';

@Injectable()
export class UserService {
  constructor(private openSearch: OpenSearch) {}

  async create(createUserDto: CreateUserDto) {
    const body = createUserDto.getMapperOpenSearch();
    await this.openSearch.index({ index: User.alias, body: body });

    return body;
  }

  /** 전체 데이터 리턴
   * @param from
   * @param size
   * @returns
   */
  async findAll(from: number, size: number) {
    const query = {
      from,
      size,
      _source: [User.first_name._, User.last_name._, User.email._],
    };

    const esRes = await this.openSearch.search({
      index: User.alias,
      body: query,
    });
    const users = {
      count: esRes.body.hits.total.value,
      user: esRes.body.hits.hits.map(({ _source }) => _source),
    };
    return users;
  }

  async findOne(id: string) {
    const query = {
      _source: [User.first_name._, User.last_name._, User.email._],
      query: { term: { _id: { value: id } } },
    };

    const esRes = await this.openSearch.search({
      index: User.alias,
      body: query,
    });
    return { user: esRes.body.hits.hits.map(({ _source }) => _source)[0] };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.openSearch.update({
      index: User.alias,
      id: id,
      body: { doc: updateUserDto.getMapperOpenSearch() },
      refresh: true,
    });

    return updateUserDto.getMapperOpenSearch();
  }

  async remove(id: string) {
    const query = { term: { _id: { value: id } } };
    await this.openSearch.delete_by_query({
      index: User.alias,
      body: { query },
      refresh: true,
    });

    return id;
  }
}
