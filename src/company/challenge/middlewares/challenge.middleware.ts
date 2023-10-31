import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChallengeMiddleware {
  constructor(private prisma: PrismaService) {}

  async haveChallenge(challenge_id: number) {
    if (!challenge_id) {
      throw new HttpException('Challenge id not found', HttpStatus.BAD_REQUEST);
    }
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challenge_id },
    });
    if (!challenge) {
      throw new HttpException('Challenge not found', HttpStatus.BAD_REQUEST);
    }
  }

  async challangeType(data: any) {
    if (data.type !== 'DISTANCE' && data.type !== 'TIME') {
      throw new HttpException(
        'Challenge type not found, please use DISTANCE or TIME',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
