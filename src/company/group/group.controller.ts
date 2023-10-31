import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { CreateGroupDto } from './dto/create-group.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GroupMiddleware } from './middleware/group.middleware';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private user: UserMiddleware,
    private group: GroupMiddleware,
  ) {}

  @Post('create/:user_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: number,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    await this.user.haveUser(user_id);
    return this.groupService.create(user_id, createGroupDto);
  }

  @Get('read-all/:user_id')
  async readAll(@Param('user_id') user_id: number) {
    await this.user.haveUser(user_id);
    return this.groupService.readAll(user_id);
  }

  @Get('read/:group_id')
  async read(@Param('group_id') group_id: number) {
    await this.group.haveGroup(group_id);
    return this.groupService.read(group_id);
  }

  @Patch('update/:group_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('group_id') group_id: number,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    await this.group.haveGroup(group_id);
    return this.groupService.update(group_id, createGroupDto);
  }

  @Delete('delete/:group_id')
  async delete(@Param('group_id') group_id: number) {
    await this.group.haveGroup(group_id);
    return this.groupService.delete(group_id);
  }
}
