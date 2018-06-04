import { UserRole } from './../models/authentication-models';

export interface IProfessor {
  id: number;
  username: string;
  password?: string;
  fullName: string;
  role: UserRole;
  active?: boolean;
  cabinet: string;
  phoneNumber: string;
  subjectsTeaching?: ISubject[];
}

export interface ISubject {
  id?: number;
  name: string;
  description?: string;
}
