import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMiddleware } from './middleware/user.middleware';
import { ManagementModule } from './management/management.module';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserMiddleware],
  exports: [UserService],
  imports: [ManagementModule],
})
export class UserModule {}
