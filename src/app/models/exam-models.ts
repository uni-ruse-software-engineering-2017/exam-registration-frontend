import { StudentEnrollmentStatus } from '../core/models/http-responses';
export interface IStudentUpcomingExam {
  id: number;
  date: Date;
  subject: string;
  room: string;
  professor: string;
  status: StudentEnrollmentStatus;
}
