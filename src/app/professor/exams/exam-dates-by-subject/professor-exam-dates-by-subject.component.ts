import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../../core/http-error-handler.service';
import { IExamResponse } from '../../../core/models/http-responses';
import { ExamService } from '../../../core/services/exam.service';
import { SubjectService } from '../../../core/services/subject.service';
import { ISubject } from '../../../models/professor.model';
import { AddExamModalComponent } from './../modals/add-exam-modal/add-exam-modal.component';

@Component({
  selector: 'ru-professor-exam-dates-by-subject',
  templateUrl: './professor-exam-dates-by-subject.component.html',
  styleUrls: ['./professor-exam-dates-by-subject.component.scss']
})
export class ProfessorExamDatesBySubjectComponent implements OnInit {
  exams: IExamResponse[] = [];
  subject: ISubject;
  subjectId: number;
  minDate = new Date();
  selectedDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private examService: ExamService,
    private dialog: MatDialog,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.subjectId = routeParams['subjectId'];

      this.subjectService
        .getById(this.subjectId)
        .subscribe(
          subj => (this.subject = subj),
          error => this.errorHandler.handle(error)
        );

      this.getExams();
    });
  }

  onDateSelected(event) {
    this.selectedDate = event;
    this.getExams();
  }

  openAddExamModal() {
    const modalRef = this.dialog.open(AddExamModalComponent, {
      data: {
        date: this.selectedDate,
        subjectId: this.subjectId
      }
    });

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getExams();
      });
  }

  /**
   * Gets all exams for the currently chosen date and the current subject
   */
  getExams() {
    return this.examService
      .getAll({
        subjectId: this.subjectId,
        date: new Intl.DateTimeFormat('bg-Bg').format(this.selectedDate)
      })
      .subscribe(
        examsList => (this.exams = examsList),
        error => this.errorHandler.handle(error)
      );
  }
}
