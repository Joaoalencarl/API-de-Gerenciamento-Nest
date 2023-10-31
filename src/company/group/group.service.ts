import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create(user_id: number, createEmployeeDto: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        ...createEmployeeDto,
        url_img: Buffer.from(createEmployeeDto.url_img),
        user: { connect: { id: user_id } },
      },
    });
  }

  async readAll(user_id: number) {
    return this.prisma.group.findMany({
      where: { user_id: user_id },
    });
  }

  async read(group_id: number) {
    return this.prisma.group.findUnique({
      where: { id: group_id },
    });
  }

  async update(group_id: number, updateGroupDto: CreateGroupDto) {
    if (updateGroupDto.url_img) {
      return this.prisma.group.update({
        where: { id: group_id },
        data: {
          ...updateGroupDto,
          url_img: Buffer.from(updateGroupDto.url_img),
        },
      });
    }
    return this.prisma.group.update({
      where: { id: group_id },
      data: { ...updateGroupDto },
    });
  }

  async delete(group_id: number) {
    return this.prisma.group.delete({
      where: { id: group_id },
    });
  }
}
