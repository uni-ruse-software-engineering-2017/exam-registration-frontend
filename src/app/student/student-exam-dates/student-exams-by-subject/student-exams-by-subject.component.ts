import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/authentication.service';
import { HttpErrorHandlerService } from '../../../core/http-error-handler.service';
import { IExamResponse } from '../../../core/models/http-responses';
import { ExamService } from '../../../core/services/exam.service';
import { SubjectService } from '../../../core/services/subject.service';
import { ISubject } from '../../../models/professor.model';
import { EnrollmentService } from '../../services/enrollment.service';

@Component({
  selector: 'ru-student-exams-by-subject',
  templateUrl: './student-exams-by-subject.component.html',
  styleUrls: ['./student-exams-by-subject.component.scss']
})
export class StudentExamsBySubjectComponent implements OnInit {
  subject: ISubject;
  exams: IExamResponse[] = [];
  subjectId: number;

  constructor(
    private examService: ExamService,
    private subjectService: SubjectService,
    private enrollmentService: EnrollmentService,
    private auth: AuthenticationService,
    private errorHandler: HttpErrorHandlerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /**
     * 1. Get the current subject ID from the route parameters.
     * 2. Fetch all upcoming exams for that subject and the subject details in parallel.
     */
    this.route.paramMap
      .pipe(
        flatMap((params: ParamMap) => {
          this.subjectId = +params.get('subjectId');

          return forkJoin(
            this.getExams(this.subjectId),
            this.subjectService.getById(this.subjectId)
          );
        })
      )
      .subscribe(
        ([exams, subject]) => {
          this.exams = exams;
          this.subject = subject;
        },
        error => this.errorHandler.handle(error)
      );
  }

  getExams(subjectId: number) {
    return this.examService.getAll({ subjectId: this.subjectId }).pipe(
      map(exams =>
        exams.map(exam => {
          exam.enrollmentStatus = this.enrollmentService.getEnrollmentStatus(
            exam
          );
          return exam;
        })
      )
    );
  }

  enroll(exam: IExamResponse) {
    return this.enrollmentService.enroll(exam.id).subscribe(
      () => {
        this.getExams(this.subjectId).subscribe(exams => (this.exams = exams));
      },
      error => this.errorHandler.handle(error)
    );
  }

  cancelEnrollment(exam: IExamResponse) {
    return this.enrollmentService.cancelEnrollment(exam.id).subscribe(
      () => {
        this.getExams(this.subjectId).subscribe(exams => (this.exams = exams));
      },
      error => this.errorHandler.handle(error)
    );
  }
}
