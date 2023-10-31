import { ChallengeType } from '@prisma/client';

export class Challenge {
  id: number;
  days: number;
  distance: number;
  url_img?: Buffer;
  reward_msg?: string;
  expires_at: Date;
  type: ChallengeType;
  has_started: boolean;
  has_reward: boolean;
}
