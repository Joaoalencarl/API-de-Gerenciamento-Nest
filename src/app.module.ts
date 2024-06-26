import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './company/employee/employee.module';
import { GroupModule } from './company/group/group.module';
import { ChallengeModule } from './company/challenge/challenge.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    EmployeeModule,
    GroupModule,
    ChallengeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
