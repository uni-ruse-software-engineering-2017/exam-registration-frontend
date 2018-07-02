import { UserRole } from './../models/authentication-models';

export interface IProfessorBase {
  fullName: string;
  cabinet: string;
  phoneNumber: string;
}

export interface INewProfessor extends IProfessorBase {
  username: string;
}

export interface IProfessor extends INewProfessor {
  id: number;
  role: UserRole;
  active: boolean;
  subjectsTeaching?: ISubject[];
}

export interface ISubject {
  id?: number;
  name: string;
  description?: string;
}
