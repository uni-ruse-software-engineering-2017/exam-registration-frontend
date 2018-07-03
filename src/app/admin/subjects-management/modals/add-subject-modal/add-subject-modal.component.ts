import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { ISubject } from '../../../../models/professor.model';

@Component({
  selector: 'ru-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.scss']
})
export class AddSubjectModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    public modalRef: MatDialogRef<AddSubjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) private subject: ISubject,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private errorHandler: HttpErrorHandlerService,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.subject ? this.subject.name : '', [Validators.required]],
      description: [this.subject ? this.subject.description : '']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value as ISubject;

    // if we are editing, we should send a PATCH request,
    // otherwise we should create a new record
    if (this.subject) {
      return this.subjectService.update(this.subject.id, formData).subscribe(
        () => {
          this.modalRef.close(true);
        },
        error => this.errorHandler.handle(error)
      );
    } else {
      return this.subjectService.create(formData).subscribe(
        () => {
          this.modalRef.close(true);
        },
        error => this.errorHandler.handle(error)
      );
    }
  }
}
