import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import {
  IEnrollmentRequest,
  StudentEnrollmentStatus
} from '../../core/models/http-responses';
import { ExamService } from '../../core/services/exam.service';
import { EnrollmentService } from '../services/enrollment.service';
import { IStudentUpcomingExam } from './../../models/exam-models';

@Component({
  selector: 'ru-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  upcomingExamsColumns = [
    'date',
    'hall',
    'subject',
    'professor',
    'status',
    'actions'
  ];

  upcomingExams: MatTableDataSource<IStudentUpcomingExam>;
  upcomingExamsData: IStudentUpcomingExam[] = [];

  constructor(
    private examService: ExamService,
    private enrolmentService: EnrollmentService,
    private auth: AuthenticationService,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.getUpcomingExams();
  }

  getUpcomingExams() {
    return this.examService.getUpcoming().subscribe(
      exams => {
        this.upcomingExamsData = exams.map(
          e =>
            ({
              id: e.id,
              date: e.startTime,
              professor: e.professor.fullName,
              room: e.hall,
              subject: e.subject.name,
              status: this._getStudentEnrolmentStatus(e.enrolledStudents)
            } as IStudentUpcomingExam)
        );
        this.upcomingExams = new MatTableDataSource(this.upcomingExamsData);
      },
      error => this.errorHandler.handle(error)
    );
  }

  cancelEnrolment(examId: number) {
    return this.enrolmentService
      .cancelEnrollment(examId)
      .subscribe(
        () => this.getUpcomingExams(),
        error => this.errorHandler.handle(error)
      );
  }

  _getStudentEnrolmentStatus(
    enrolments: IEnrollmentRequest[]
  ): StudentEnrollmentStatus {
    if (!enrolments || enrolments.length === 0) {
      return 'NONE';
    }

    const currentStudentEnrolment = enrolments.filter(
      e => e.student.username === this.auth.getUserDetails().username
    )[0];

    if (currentStudentEnrolment) {
      return currentStudentEnrolment.status;
    }

    return 'NONE';
  }
}
