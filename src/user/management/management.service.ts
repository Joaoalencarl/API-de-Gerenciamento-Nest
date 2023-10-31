import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ManagementService {
  constructor(private prisma: PrismaService) {}

  async addEmployeeToGroup(group_id: number, employee_id: number) {
    await this.prisma.group.update({
      where: { id: group_id },
      data: { members: { connect: { id: employee_id } } },
    });
    const group = await this.prisma.group.findUnique({
      where: { id: group_id },
      include: { members: true },
    });
    return group.members;
  }
}
