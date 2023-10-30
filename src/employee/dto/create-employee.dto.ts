import { Sex } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsOptional()
  playfab_id: string | null;

  //profiles
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({ allow_display_name: true }, { message: 'O email é inválido' })
  email: string;

  @IsNotEmpty({ message: 'O cpf é obrigatório' })
  cpf: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birth_date: Date;

  @IsNotEmpty({ message: 'O sexo é obrigatório' })
  sex: Sex;

  @IsOptional()
  url_img: Buffer | null;
}
