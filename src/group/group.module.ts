import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { GroupMiddleware } from './middleware/group.middleware';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupMiddleware, UserMiddleware, PrismaService],
})
export class GroupModule {}
