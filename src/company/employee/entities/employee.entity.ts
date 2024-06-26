import { Sex } from '@prisma/client';

export class Employee {
  id: number;
  playfab_id: string | null;
  name: string;
  email: string;
  cpf: string;
  birth_date: Date;
  sex: Sex;
  url_img: Buffer | null;
}
