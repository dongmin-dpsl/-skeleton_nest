import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { OpenSearch } from 'src/lib/opensearch';

@Module({
  controllers: [UserController],
  providers: [UserService, OpenSearch],
})
export class UserModule {}
