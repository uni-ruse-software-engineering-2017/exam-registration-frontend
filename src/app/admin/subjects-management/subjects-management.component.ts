import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { catchError, filter } from 'rxjs/operators';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { ConfirmationModalService } from '../../core/services/confirmation-modal.service';
import { SubjectService } from '../../core/services/subject.service';
import { ISubject } from '../../models/professor.model';
import { AddSubjectModalComponent } from './modals/add-subject-modal/add-subject-modal.component';

@Component({
  selector: 'ru-subjects-management',
  templateUrl: './subjects-management.component.html',
  styleUrls: ['./subjects-management.component.scss']
})
export class SubjectsManagementComponent implements OnInit {
  subjects: ISubject[] = [];

  constructor(
    private subjectService: SubjectService,
    private errorHandler: HttpErrorHandlerService,
    private dialog: MatDialog,
    private confirmationModal: ConfirmationModalService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.getSubjects();
  }

  getSubjects() {
    return this.subjectService
      .getAll()
      .subscribe(
        subjects => (this.subjects = subjects),
        error => this.errorHandler.handle(error)
      );
  }

  deleteSubject(subjectId: number) {
    return this.subjectService.remove(subjectId);
  }

  openAddSubjectModal() {
    const modalRef = this.dialog.open(AddSubjectModalComponent);

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getSubjects();
      });
  }

  openEditSubjectModal(subject: ISubject) {
    const modalRef = this.dialog.open(AddSubjectModalComponent, {
      data: subject
    });

    return modalRef
      .afterClosed()
      .pipe(filter((result: boolean) => result))
      .subscribe(() => {
        this.getSubjects();
      });
  }

  openDeleteSubjectModal(subject: ISubject) {
    this.confirmationModal
      .confirm(
        this.translate.instant('Delete subject'),
        this.translate.instant('Are you sure you want to delete the subject?', {
          subject: subject.name
        })
      )
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => {
        this.deleteSubject(subject.id).subscribe(
          () => {
            this.getSubjects();
          },
          error => this.errorHandler.handle(error)
        );
      });
  }
}
