import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user.service';
import { UserController } from '../../controller/user/user.controller';
import { OpenSearch } from '../../common/lib/opensearch';
import { UserRepository } from 'src/database/opensearch/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    OpenSearch,
    { provide: 'UserUseCase', useClass: UserService },
    { provide: 'UserOsCommandPort', useClass: UserRepository },
    { provide: 'UserOsQueryPort', useClass: UserRepository },
  ],
})
export class UserModule {}
