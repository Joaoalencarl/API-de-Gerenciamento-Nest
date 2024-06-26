import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { cpf } from 'cpf-cnpj-validator';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeeMiddleware {
  constructor(private prisma: PrismaService) {}

  async verify(createEmployeeDto: CreateEmployeeDto) {
    if (
      await this.prisma.employee.findUnique({
        where: { cpf: cpf.format(createEmployeeDto.cpf) },
      })
    ) {
      throw new HttpException(
        'Já existe um funcionário cadastrado com esse CPF',
        HttpStatus.BAD_REQUEST,
      );
    } else if (!cpf.isValid(createEmployeeDto.cpf)) {
      throw new HttpException(
        'O CPF informado é inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      await this.prisma.employee.findUnique({
        where: { email: createEmployeeDto.email },
      })
    ) {
      throw new HttpException(
        'Já existe um funcionário cadastrado com esse email',
        HttpStatus.BAD_REQUEST,
      );
    }

    return cpf.format(createEmployeeDto.cpf);
  }

  async haveEmployee(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: id },
    });

    if (!employee) {
      throw new HttpException(
        'O funcionário informado não foi encontrado',
        HttpStatus.BAD_REQUEST,
      );
    }

    // erro de identificação, função não está sendo usada corretamente
    if (!id) {
      throw new HttpException(
        'O id do funcionário não foi informado',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyUpdate(data: UpdateEmployeeDto) {
    if (data.cpf) {
      if (
        await this.prisma.employee.findUnique({
          where: { cpf: cpf.format(data.cpf) },
        })
      ) {
        throw new HttpException(
          'Já existe um funcionário cadastrado com esse CPF',
          HttpStatus.BAD_REQUEST,
        );
      } else if (!cpf.isValid(data.cpf)) {
        throw new HttpException(
          'O CPF informado é inválido',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (
      await this.prisma.employee.findUnique({
        where: { email: data.email },
      })
    ) {
      44;
      throw new HttpException(
        'Já existe um funcionário cadastrado com esse email',
        HttpStatus.BAD_REQUEST,
      );
    }

    return cpf.format(data.cpf);
  }

  async verifyPlayerId(playfab_id: string) {
    const user = await this.prisma.employee.findUnique({
      where: { playfab_id: playfab_id },
    });
    if (!user) {
      throw new HttpException(
        'O funcionário informado não foi encontrado',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return user;
    }
  }
}
