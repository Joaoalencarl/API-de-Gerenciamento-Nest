import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserMiddleware {
  constructor(private prisma: PrismaService) {}
  async verify(data: CreateUserDto) {
    if (
      await this.prisma.user.findUnique({
        where: { email: data.email },
      })
    ) {
      throw new HttpException(
        'Já existe um usuário cadastrado com esse email',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      await this.prisma.user.findUnique({
        where: { cnpj: data.cnpj },
      })
    ) {
      throw new HttpException(
        'Já existe um usuário cadastrado com esse CNPJ',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      data.userType != 'COMPANY' &&
      data.userType != 'COMPANY_SERVICE' &&
      data.userType != 'PARTNER'
    ) {
      throw new HttpException(
        'Tipo de usuário inválido, Tente COMPANY, COMPANY_SERVICE OU PARTNER',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
