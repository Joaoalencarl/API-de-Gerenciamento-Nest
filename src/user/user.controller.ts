import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserMiddleware } from './middleware/user.middleware';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

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
}
