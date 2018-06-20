import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap, filter } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../../core/http-error-handler.service';
import {
  IEnrollmentRequest,
  IExamResponse
} from '../../../core/models/http-responses';
import { ExamService } from '../../../core/services/exam.service';
import { MatDialog } from '@angular/material';
import { RejectStudentModalComponent } from '../modals/reject-student-modal/reject-student-modal.component';

@Component({
  selector: 'ru-professor-exam-date-details',
  templateUrl: './professor-exam-date-details.component.html',
  styleUrls: ['./professor-exam-date-details.component.scss']
})
export class ProfessorExamDateDetailsComponent implements OnInit {
  exam: IExamResponse;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(flatMap(params => this.getExam(+params['examId'])))
      .subscribe(
        exam => (this.exam = exam),
        error => this.errorHandler.handle(error)
      );
  }

  getExam(id: number) {
    return this.examService.getById(id);
  }

  approveStudent(enrollmentRequest: IEnrollmentRequest) {
    return this.examService
      .changeEnrollmentStatus(
        this.exam.id,
        enrollmentRequest.student.id,
        'APPROVED'
      )
      .subscribe(
        updatedExam => (this.exam = updatedExam),
        error => this.errorHandler.handle(error)
      );
  }

  openRejectStudentModal(enrollmentRequest: IEnrollmentRequest) {
    this.dialog
      .open(RejectStudentModalComponent, {
        data: {
          enrollment: enrollmentRequest,
          examId: this.exam.id
        }
      })
      .afterClosed()
      .pipe(filter(result => !!result))
      .subscribe((updatedExam: IExamResponse) => {
        this.exam = updatedExam;
      });
  }
}
