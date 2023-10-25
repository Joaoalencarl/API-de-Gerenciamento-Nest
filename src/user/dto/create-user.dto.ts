import { UserType } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome da empresa é obrigatório' })
  company_name: string;

  @IsOptional()
  fantasy_name?: string | null;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  cnpj: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve conter no mínimo 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'O segmento é obrigatório' })
  segment: string;

  @IsNotEmpty({ message: 'O tipo de usuário é obrigatório' })
  userType: UserType;

  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  phone: string;

  // Address fields
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @IsNotEmpty({ message: 'O número é obrigatório' })
  number: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  city: string;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  uf: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  neighborhood: string;

  @IsNotEmpty({ message: 'A rua é obrigatória' })
  street: string;
}
