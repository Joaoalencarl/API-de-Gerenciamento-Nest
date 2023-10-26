import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMiddleware } from './middleware/user.middleware';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly middleware: UserMiddleware,
  ) {}

  @IsPublic()
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    await this.middleware.verify(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get('all')
  async findAll() {
    await this.middleware.noUsersInDatabase();
    return this.userService.findAll();
  }

  @Get('read/:user_id')
  async findOne(@Param('user_id') user_id: number) {
    await this.middleware.haveUser(user_id);
    return this.userService.findOne(user_id);
  }

  @Patch('update/:user_id')
  async update(
    @Param('user_id') user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.middleware.haveUser(user_id);
    await this.middleware.verifyUpdate(updateUserDto);
    await this.middleware.updatePassword(updateUserDto);
    return this.userService.update(user_id, updateUserDto);
  }

  @Delete('delete/:user_id')
  async remove(@Param('user_id') user_id: number) {
    await this.middleware.haveUser(user_id);
    return this.userService.remove(user_id);
  }
}
