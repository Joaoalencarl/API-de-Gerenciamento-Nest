import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GroupMiddleware {
  constructor(private prisma: PrismaService) {}

  async haveGroup(group_id: number) {
    if (!group_id) {
      throw new HttpException(
        'O id do grupo não foi informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    const group = await this.prisma.group.findUnique({
      where: { id: group_id },
    });
    if (!group) {
      throw new HttpException('Group not found', HttpStatus.BAD_REQUEST);
    }
  }
}
