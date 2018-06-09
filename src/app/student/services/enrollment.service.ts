import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
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
    return this.http.post(`${API_URL}/exams/${examId}/apply`, null);
  }

  cancelEnrollment(examId: number) {
    return this.http.post(`${API_URL}/exams/${examId}/cancel`, null);
  }

  getEnrollmentStatus(exam: IExamResponse): StudentEnrollmentStatus {
    if (!exam || exam.participationRequests.length === 0) {
      return 'NONE';
    }

    const currentStudentEnrollment = exam.participationRequests.filter(
      pr => pr.student.username === this.auth.getUserDetails().username
    )[0];

    if (currentStudentEnrollment) {
      return currentStudentEnrollment.status;
    } else {
      return 'NONE';
    }
  }
}
