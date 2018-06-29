import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { ExamService } from '../../core/services/exam.service';
import { IProfessorUpcomingExam } from '../../models/exam-models';
import { EnrollmentService } from '../../student/services/enrollment.service';

@Component({
  selector: 'ru-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss']
})
export class ProfessorDashboardComponent implements OnInit {
  upcomingExamsColumns = ['date', 'hall', 'subject', 'enrolments', 'actions'];
  upcomingExams: MatTableDataSource<IProfessorUpcomingExam>;
  upcomingExamsData: IProfessorUpcomingExam[] = [];

  constructor(
    private examService: ExamService,
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
              hall: e.hall,
              subject: e.subject,
              enrolledCount: e.enrolledStudents.filter(
                es => es.status === 'ACCEPTED'
              ).length,
              maxSeats: e.maxSeats
            } as IProfessorUpcomingExam)
        );
        this.upcomingExams = new MatTableDataSource(this.upcomingExamsData);
      },
      error => this.errorHandler.handle(error)
    );
  }
}
