import { UserType } from '@prisma/client';

export class User {
  id: number;

  company_name: string;
  fantasy_name: string | null;
  cnpj: string;
  email: string;
  password: string;
  segment: string;
  userType: UserType;
  phone: string;

  cep: string;
  number: string;
  city: string;
  uf: string;
  neighborhood: string;
}
