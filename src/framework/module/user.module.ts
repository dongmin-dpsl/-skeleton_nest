import { Module } from '@nestjs/common';
import { UserService } from '../../application/service/user.service';
import { UserController } from '../../adapter/web/user.controller';
import { OpenSearch } from '../../application/common/opensearch';
import { UserRepository } from '../../adapter/opensearch/user.repository';

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
