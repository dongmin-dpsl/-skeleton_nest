import { CreateUserCommand, UpdateUserCommand } from '../in/user.usecase';

export interface UserOsCommandPort {
  createUser(createUserCommand: CreateUserCommand): Promise<string>;
  updateUser(
    id: string,
    updateUserCommand: UpdateUserCommand,
  ): Promise<boolean>;
  deleteUser(id: string): Promise<void>;
}
