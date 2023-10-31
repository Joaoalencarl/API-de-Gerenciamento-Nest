import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Injectable()
export class ChallengeService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: number, createChallengeDto: CreateChallengeDto) {
    const challenge = await this.prisma.challenge.create({
      data: {
        ...createChallengeDto,
        url_img: Buffer.from(createChallengeDto.url_img),
        user: { connect: { id: user_id } },
      },
    });
    return challenge;
  }

  async readAll(user_id: number) {
    const challenges = await this.prisma.challenge.findMany({
      where: { user_id },
    });
    return challenges;
  }

  async read(challenge_id: number) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challenge_id },
    });
    return challenge;
  }

  async update(challenge_id: number, updateChallengeDto: UpdateChallengeDto) {
    if (updateChallengeDto.url_img) {
      return this.prisma.challenge.update({
        where: { id: challenge_id },
        data: {
          ...updateChallengeDto,
          url_img: Buffer.from(updateChallengeDto.url_img),
        },
      });
    }
    return this.prisma.challenge.update({
      where: { id: challenge_id },
      data: { ...updateChallengeDto },
    });
  }

  async delete(challenge_id: number) {
    return this.prisma.challenge.delete({
      where: { id: challenge_id },
    });
  }
}
