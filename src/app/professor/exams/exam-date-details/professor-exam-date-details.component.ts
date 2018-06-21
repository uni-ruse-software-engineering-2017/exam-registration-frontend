import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, flatMap, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/authentication.service';
import { HttpErrorHandlerService } from '../../../core/http-error-handler.service';
import {
  IEnrollmentRequest,
  IExamResponse
} from '../../../core/models/http-responses';
import { ConfirmationModalService } from '../../../core/services/confirmation-modal.service';
import { ExamService } from '../../../core/services/exam.service';
import { IUserProfile } from '../../../models/authentication-models';
import { RejectStudentModalComponent } from '../modals/reject-student-modal/reject-student-modal.component';

@Component({
  selector: 'ru-professor-exam-date-details',
  templateUrl: './professor-exam-date-details.component.html',
  styleUrls: ['./professor-exam-date-details.component.scss']
})
export class ProfessorExamDateDetailsComponent implements OnInit {
  exam: IExamResponse;
  professor: IUserProfile;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private errorHandler: HttpErrorHandlerService,
    private auth: AuthenticationService,
    private confirmationModal: ConfirmationModalService,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.professor = this.auth.getUserDetails();

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

  openConfirmCancellationModal(exam: IExamResponse) {
    this.confirmationModal
      .confirm(
        this.translate.instant('Cancel Exam'),
        this.translate.instant(
          'Are you sure you want to cancel this exam date?'
        )
      )
      .pipe(
        filter(answer => !!answer),
        switchMap(() => this.examService.cancel(exam.id))
      )
      .subscribe(
        () => {
          this.router.navigate(['../../'], { relativeTo: this.route });
        },
        error => this.errorHandler.handle(error)
      );
  }
}
