import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

  async haveUser(id: number) {
    if (!id) {
      throw new HttpException(
        'O id do usuário não foi informado',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (
      !(await this.prisma.user.findUnique({
        where: { id },
      }))
    ) {
      throw new HttpException(
        'Não existe um usuário cadastrado com esse id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyUpdate(data: UpdateUserDto) {
    if (data.email) {
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
    }

    if (data.cnpj) {
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
    }
    if (data.userType) {
      throw new HttpException(
        'Não é possível alterar o tipo de usuário',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async updatePassword(data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
  }
  async noUsersInDatabase() {
    const users = await this.prisma.user.findMany();

    if (users.length == 0) {
      throw new HttpException(
        'Não existem usuários cadastrados',
        HttpStatus.OK,
      );
    }
  }
}
