import { UserModel } from '../../../domain/user.model';

import { FindUserListCommand } from '../in/user.usecase';

export interface UserOsQueryPort {
  findAll(findUserListCommand: FindUserListCommand): Promise<UserModel[]>;
  findOneById(id: string): Promise<UserModel>;
}
