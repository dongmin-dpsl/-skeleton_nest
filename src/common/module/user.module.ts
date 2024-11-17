import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user.service';
import { UserController } from '../../controller/user/user.controller';
import { OpenSearch } from '../../common/lib/opensearch';

@Module({
  controllers: [UserController],
  providers: [UserService, OpenSearch],
})
export class UserModule {}
