import { ChallengeType } from '@prisma/client';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty({ message: 'O campo days é obrigatório' })
  days: number;

  @IsNotEmpty({ message: 'O campo distance é obrigatório' })
  distance: number;

  @IsOptional()
  url_img?: Buffer;

  @IsOptional()
  reward_msg?: string;

  @IsNotEmpty({ message: 'O campo expires_at é obrigatório' })
  expires_at: Date;

  @IsNotEmpty({ message: 'O campo type é obrigatório' })
  type: ChallengeType;

  @IsNotEmpty({ message: 'O campo has_started é obrigatório' })
  has_started: boolean;

  @IsNotEmpty({ message: 'O campo has_reward é obrigatório' })
  has_reward: boolean;
}
