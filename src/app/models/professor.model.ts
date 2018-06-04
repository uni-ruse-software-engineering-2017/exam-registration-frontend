import { UserRole } from './../models/authentication-models';

export interface IProfessor extends INewProfessor {
  id: number;
  role: UserRole;
  active: boolean;
  subjectsTeaching?: ISubject[];
}

export interface INewProfessor {
  username: string;
  fullName: string;
  cabinet: string;
  phoneNumber: string;
}

export interface ISubject {
  id?: number;
  name: string;
  description?: string;
}
