import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { OpenSearch } from 'src/lib/opensearch';
import { ApiResponse } from '@opensearch-project/opensearch/.';

describe('UserService', () => {
  let service: UserService;
  let openSearch: OpenSearch;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, OpenSearch],
    }).compile();

    service = module.get<UserService>(UserService);
    openSearch = module.get<OpenSearch>(OpenSearch);
  });

  it('should be return User Object', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('신규 생성된 데이터를 반환하여야 한다.', async () => {});
  });

  describe('findAll', () => {
    it('데이터가 존재하면 배열로 반환하여야 한다.', async () => {
      const from: number = 0;
      const size: number = 2;

      const searchRes = {
        _index: 'user',
        _id: 'jdHS_pIB8dn8chLWi5jz',
        _version: 1,
        result: 'created',
        _shards: { total: 2, successful: 1, failed: 0 },
        _seq_no: 12,
        _primary_term: 2,
      };

      jest.spyOn(openSearch, 'search').mockResolvedValue(searchRes);
    });
  });
});
