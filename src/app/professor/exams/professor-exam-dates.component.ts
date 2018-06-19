import { Component, OnInit } from '@angular/core';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { SubjectService } from '../../core/services/subject.service';
import { ISubject } from '../../models/professor.model';

@Component({
  selector: 'ru-professor-exam-dates',
  templateUrl: './professor-exam-dates.component.html',
  styleUrls: ['./professor-exam-dates.component.scss']
})
export class ProfessorExamDatesComponent implements OnInit {
  subjects: ISubject[] = [];

  constructor(
    private subjectService: SubjectService,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.subjectService.getAll().subscribe(
      subjectsList => {
        this.subjects = subjectsList;
      },
      error => this.errorHandler.handle(error)
    );
  }
}
