import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Inject,
} from '@nestjs/common';
import {
  UserUseCase,
  CreateUserCommand,
  FindUserListCommand,
  UpdateUserCommand,
} from '../../domain/port/in/user.usecase';

@Controller('user')
export class UserController {
  constructor(
    @Inject('UserUseCase')
    private readonly userUseCase: UserUseCase,
  ) {}

  @Post()
  async create(@Body() createUserCommand: CreateUserCommand) {
    const docId = await this.userUseCase.createUser(createUserCommand);
    return this.userUseCase.findUser(docId);
  }

  @Get()
  findAll(@Req() findUserListCommand: FindUserListCommand) {
    return this.userUseCase.findUserList(findUserListCommand);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userUseCase.findUser(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserCommand: UpdateUserCommand,
  ) {
    await this.userUseCase.updateUser(id, updateUserCommand);
    return this.userUseCase.findUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userUseCase.deleteUser(id);
  }
}
