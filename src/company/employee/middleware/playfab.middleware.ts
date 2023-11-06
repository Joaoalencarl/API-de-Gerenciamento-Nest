import { Injectable } from '@nestjs/common';
import { PlayFab, PlayFabAdmin } from 'playfab-sdk';

@Injectable()
export class PlayFabMiddleware {
  constructor() {
    PlayFab.settings.titleId = process.env.TITLE_ID;
    PlayFab.settings.developerSecretKey = process.env.SECRET_KEY;
  }
  async getPlayersInSegment(
    segmentId: any,
  ): Promise<PlayFabAdminModels.GetPlayersInSegmentResult> {
    const request: PlayFabAdminModels.GetPlayersInSegmentRequest = {
      SegmentId: segmentId,
    };

    return new Promise((resolve, reject) => {
      PlayFabAdmin.GetPlayersInSegment(request, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.data);
        }
      });
    });
  }

  async getTitleId(email: string) {
    const segment = await this.getPlayersInSegment(process.env.SEGMENT_ID);
    return segment.PlayerProfiles.find(
      (player) =>
        player.ContactEmailAddresses.map((e) => e.EmailAddress)[0] === email,
    ).PlayerId;
  }
}
