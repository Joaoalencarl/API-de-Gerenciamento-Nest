import { Module } from '@nestjs/common';
import { ManagementService } from './management.service';
import { ManagementController } from './management.controller';
import { UserMiddleware } from '../middleware/user.middleware';
import { GroupMiddleware } from 'src/company/group/middleware/group.middleware';
import { EmployeeMiddleware } from 'src/company/employee/middleware/employee.middleware';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ManagementController],
  providers: [
    ManagementService,
    UserMiddleware,
    GroupMiddleware,
    EmployeeMiddleware,
    PrismaService,
  ],
})
export class ManagementModule {}
