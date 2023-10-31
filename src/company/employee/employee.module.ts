import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeMiddleware } from './middleware/employee.middleware';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { PlayFabMiddleware } from './middleware/playfab.middleware';

@Module({
  controllers: [EmployeeController],
  providers: [
    EmployeeService,
    PrismaService,
    EmployeeMiddleware,
    UserMiddleware,
    PlayFabMiddleware,
  ],
})
export class EmployeeModule {}
