export interface IUserCredentials {
  username: string;
  password: string;
}

export type UserRole = 'STUDENT' | 'PROFESSOR' | 'ADMIN';

export interface IUserProfile {
  username: string;
  fullName: string;
  role: UserRole;
}

export interface IJwtUserData {
  exp: number;
  iat: number;
  iss: string;
  role: UserRole;
  sub: string;
}
