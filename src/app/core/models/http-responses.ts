import { UserRole } from '../../models/authentication-models';

export interface ISubjectResponse {
  id: number;
  name: string;
  description: string;
}

export interface IProfessorResponse {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  cabinet: string;
  phoneNumber: string;
  subjectsTeaching: ISubjectResponse[];
}

export interface IStudentResponse {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;
  active: boolean;
  facultyNumber: string;
  studyForm: string;
  specialty: string;
  groupNumber: string;
}

export interface IExamResponse {
  id: number;
  startTime: Date;
  endTime: Date;
  hall: string;
  maxSeats: number;
  subject: ISubjectResponse;
  professor: IProfessorResponse;
  enrolledStudents: IEnrollmentRequest[];
  createdOn: Date;
  modifiedOn: Date;
  enrollmentStatus?: StudentEnrollmentStatus;
}

export interface IEnrollmentRequest {
  student: IStudentResponse;
  status: StudentEnrollmentStatus;
  reason?: string;
}

export type StudentEnrollmentStatus =
  | 'NONE'
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED';
