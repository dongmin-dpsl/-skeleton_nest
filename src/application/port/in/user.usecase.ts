import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  NotEquals,
} from 'class-validator';
import { UserModel } from '../../../domain/user.model';

export interface UserUseCase {
  createUser(createUserCommand: CreateUserCommand): Promise<string>;
  findUserList(findUserListCommand: FindUserListCommand): Promise<UserModel[]>;
  findUser(id: string): Promise<UserModel>;
  updateUser(id: string, updateUserCommand: UpdateUserCommand): Promise<string>;
  deleteUser(id: string): Promise<string>;
}

export class FindUserListCommand {
  @IsNumber()
  @Min(0)
  from: number;

  @Min(1)
  @Max(100)
  size: number;
}

export class UpdateUserCommand {
  @IsEmail()
  email: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(10)
  firstName: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(2)
  gender: string;

  @NotEquals(null)
  @IsNotEmpty()
  ipAddress: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(20)
  lastName: string;
}

export class CreateUserCommand {
  @IsEmail()
  email: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(10)
  firstName: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(2)
  gender: string;

  @NotEquals(null)
  @IsNotEmpty()
  ipAddress: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(20)
  lastName: string;
}
