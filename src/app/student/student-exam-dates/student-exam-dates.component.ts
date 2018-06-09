import { Component, OnInit } from '@angular/core';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { SubjectService } from '../../core/services/subject.service';
import { ISubject } from '../../models/professor.model';

@Component({
  selector: 'ru-student-exam-dates',
  templateUrl: './student-exam-dates.component.html',
  styleUrls: ['./student-exam-dates.component.css']
})
export class StudentExamDatesComponent implements OnInit {
  subjects: ISubject[] = [];

  constructor(
    private subjectService: SubjectService,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    this.subjectService.getAll().subscribe(
      subjects => {
        this.subjects = subjects;
      },
      error => this.errorHandler.handle(error)
    );
  }
}
