import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { IProfessor } from '../../models/professor.model';
import { ProfessorService } from '../services/professor.service';
import { AddProfessorModalComponent } from './modals/add-professor-modal/add-professor-modal.component';

@Component({
  selector: 'ru-professors-management',
  templateUrl: './professors-management.component.html',
  styleUrls: ['./professors-management.component.scss']
})
export class ProfessorsManagementComponent implements OnInit {
  professors: IProfessor[] = [];

  constructor(
    private professorService: ProfessorService,
    private errorHandler: HttpErrorHandlerService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.professorService
      .getAll()
      .subscribe(
        professors => (this.professors = professors),
        error => this.errorHandler.handle(error)
      );
  }

  getProfessors() {
    this.professorService
      .getAll()
      .subscribe(
        professors => (this.professors = professors),
        error => this.errorHandler.handle(error)
      );
  }

  openAddProfessorModal() {
    const modalRef = this.dialog.open(AddProfessorModalComponent);

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getProfessors();
      });
  }
}
