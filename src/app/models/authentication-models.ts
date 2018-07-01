import { ISubject } from './professor.model';

export interface IUserCredentials {
  username: string;
  password: string;
}

export type UserRole = 'STUDENT' | 'PROFESSOR' | 'ADMIN';

export interface IUserProfile {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  active: boolean;
  cabinet?: string;
  phoneNumber?: string;
  subjectsTeaching?: ISubject[];
}

export interface IJwtUserData {
  exp: number;
  iat: number;
  iss: string;
  role: UserRole;
  sub: string;
}
