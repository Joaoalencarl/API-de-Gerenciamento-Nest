import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { PlayFabMiddleware } from './middleware/playfab.middleware';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private playfab: PlayFabMiddleware,
  ) {}

  async create(user_id: number, createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        playfab_id: await this.playfab.getTitleId(createEmployeeDto.email),
        url_img: Buffer.from(createEmployeeDto.url_img),
        user: { connect: { id: user_id } },
      },
    });
  }

  async readAll(user_id: number) {
    return this.prisma.employee.findMany({
      where: { user_id: user_id },
    });
  }

  async read(employe_id: number) {
    return this.prisma.employee.findUnique({
      where: { id: employe_id },
    });
  }

  async update(employe_id: number, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto.url_img) {
      return this.prisma.employee.update({
        where: { id: employe_id },
        data: {
          ...updateEmployeeDto,
          url_img: Buffer.from(updateEmployeeDto.url_img),
        },
      });
    }
    return this.prisma.employee.update({
      where: { id: employe_id },
      data: { ...updateEmployeeDto },
    });
  }
}
