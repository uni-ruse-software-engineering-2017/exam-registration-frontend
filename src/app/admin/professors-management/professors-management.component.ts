import { Component, OnInit } from '@angular/core';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { IProfessor } from '../../models/professor.model';
import { ProfessorService } from '../services/professor.service';

@Component({
  selector: 'ru-professors-management',
  templateUrl: './professors-management.component.html',
  styleUrls: ['./professors-management.component.css']
})
export class ProfessorsManagementComponent implements OnInit {
  professors: IProfessor[] = [];

  constructor(
    private professorService: ProfessorService,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.professorService
      .getAll()
      .subscribe(
        professors => (this.professors = professors),
        error => this.errorHandler.handle(error)
      );
  }
}
