import { IsEmail, IsNotEmpty, MaxLength, NotEquals } from 'class-validator';

export class CreateUserDto {
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
  id: string;

  @NotEquals(null)
  @IsNotEmpty()
  ipAddress: string;

  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(20)
  lastName: string;
}
