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
  examsByMonth: Array<{ month: Date; exams: IExamResponse[] }> = [];
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
          this.examsByMonth = exams;
          this.subject = subject;
        },
        error => this.errorHandler.handle(error)
      );
  }

  getExams(subjectId: number) {
    return this.examService.getAll({ subjectId: this.subjectId }).pipe(
      map(exams => {
        // adds calculated values to the exams
        const examsList = exams.map(exam => {
          exam.enrollmentStatus = this.enrollmentService.getEnrollmentStatus(
            exam
          );

          return exam;
        });

        return this._groupExamsByMonth(examsList);
      })
    );
  }

  enroll(exam: IExamResponse) {
    return this.enrollmentService.enroll(exam.id).subscribe(
      () => {
        this.getExams(this.subjectId).subscribe(
          exams => (this.examsByMonth = exams)
        );
      },
      error => this.errorHandler.handle(error)
    );
  }

  cancelEnrollment(exam: IExamResponse) {
    return this.enrollmentService.cancelEnrollment(exam.id).subscribe(
      () => {
        this.getExams(this.subjectId).subscribe(
          exams => (this.examsByMonth = exams)
        );
      },
      error => this.errorHandler.handle(error)
    );
  }

  /**
   * Groups upcoming exams by month and year.
   *
   * @param exams - exams list
   */
  private _groupExamsByMonth(exams: IExamResponse[]) {
    const months = Array.from(
      new Set(
        exams.map(x => {
          const asDate = new Date(x.startTime);
          const year = asDate.getFullYear();
          const month = asDate.getMonth() + 1;
          return `${year}-${month >= 10 ? month : '0' + month}`;
        })
      )
    );

    const groupedByMonths = months.map(month => ({
      month: this._monthStringToDate(month),
      exams: exams.filter(e => e.startTime.toString().indexOf(month) === 0)
    }));

    return groupedByMonths;
  }

  /**
   * Converts a year-month string (e.g. 2019-6) to a date: 1st June, 2019
   *
   * @param s - year-month string
   */
  private _monthStringToDate(s: string) {
    const [year, month] = s.split('-').map(x => parseInt(x, 10));

    return new Date(year, month - 1, 1, 0, 0, 0, 0);
  }
}
