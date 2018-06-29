import { StudentEnrollmentStatus } from '../core/models/http-responses';
import { ISubject } from './professor.model';

export interface IStudentUpcomingExam {
  id: number;
  date: Date;
  subject: string;
  room: string;
  professor: string;
  status: StudentEnrollmentStatus;
}

export interface IProfessorUpcomingExam {
  id: number;
  date: Date;
  subject: ISubject;
  hall: string;
  enrolledCount: number;
  maxSeats: number;
}
