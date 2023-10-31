import { Module } from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { ChallengeController } from './challenge.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { ChallengeMiddleware } from './middlewares/challenge.middleware';

@Module({
  controllers: [ChallengeController],
  providers: [
    ChallengeService,
    ChallengeMiddleware,
    UserMiddleware,
    PrismaService,
  ],
})
export class ChallengeModule {}
