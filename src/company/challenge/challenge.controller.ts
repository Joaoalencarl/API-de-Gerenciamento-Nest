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
import { ChallengeService } from './challenge.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UserMiddleware } from 'src/user/middleware/user.middleware';
import { ChallengeMiddleware } from './middlewares/challenge.middleware';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

@Controller('challenge')
export class ChallengeController {
  constructor(
    private challengeService: ChallengeService,
    private user: UserMiddleware,
    private challenge: ChallengeMiddleware,
  ) {}

  @Post('create/:user_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Param('user_id') user_id: number,
    @Body()
    createChallengeDto: CreateChallengeDto,
  ) {
    const userId = user_id;
    await this.user.haveUser(userId);
    await this.challenge.challangeType(createChallengeDto);
    const challenge = this.challengeService.create(user_id, {
      ...createChallengeDto,
    });
    return challenge;
  }

  @Get('read-all/:user_id')
  async readAll(@Param('user_id') user_id: number) {
    const userId = user_id;
    await this.user.haveUser(userId);
    const challenges = this.challengeService.readAll(user_id);
    return challenges;
  }

  @Get('read/:challenge_id')
  async read(@Param('challenge_id') challenge_id: number) {
    await this.challenge.haveChallenge(challenge_id);
    const challenge = this.challengeService.read(challenge_id);
    return challenge;
  }

  @Patch('update/:challenge_id')
  @UseInterceptors(FileInterceptor('url_img'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Param('challenge_id') challenge_id: number,
    @Body()
    updateChallengeDto: UpdateChallengeDto,
  ) {
    await this.challenge.haveChallenge(challenge_id);
    await this.challenge.challangeType(updateChallengeDto);
    const challenge = this.challengeService.update(challenge_id, {
      ...updateChallengeDto,
    });
    return challenge;
  }

  @Delete('delete/:challenge_id')
  async delete(@Param('challenge_id') challenge_id: number) {
    await this.challenge.haveChallenge(challenge_id);
    const challenge = this.challengeService.delete(challenge_id);
    return challenge;
  }
}
