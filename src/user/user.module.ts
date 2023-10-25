import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMiddleware } from './middleware/user.middleware';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserMiddleware],
  exports: [UserService],
})
export class UserModule {}
