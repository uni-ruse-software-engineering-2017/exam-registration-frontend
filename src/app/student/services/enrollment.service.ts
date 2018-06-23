import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/authentication.service';
import {
  IExamResponse,
  StudentEnrollmentStatus
} from '../../core/models/http-responses';

const API_URL = environment.API_URL;

@Injectable()
export class EnrollmentService {
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  enroll(examId: number) {
    return this.http.post(
      `${API_URL}/exams/${examId}/enrol`,
      null
    ) as Observable<IExamResponse>;
  }

  cancelEnrollment(examId: number) {
    return this.http.post(
      `${API_URL}/exams/${examId}/unenrol`,
      null
    ) as Observable<IExamResponse>;
  }

  getEnrollmentStatus(exam: IExamResponse): StudentEnrollmentStatus {
    if (!exam || exam.enrolledStudents.length === 0) {
      return 'NONE';
    }

    const currentStudentEnrollment = exam.enrolledStudents.filter(
      e => e.student.username === this.auth.getUserDetails().username
    )[0];

    if (currentStudentEnrollment) {
      return currentStudentEnrollment.status;
    } else {
      return 'NONE';
    }
  }
}
