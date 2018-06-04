import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { SubjectService } from '../../../../core/services/subject.service';
import { ISubject } from '../../../../models/professor.model';

@Component({
  selector: 'ru-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.css']
})
export class AddSubjectModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    public modalRef: MatDialogRef<AddSubjectModalComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private errorHandler: HttpErrorHandlerService,
    private router: Router,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value as ISubject;

    return this.subjectService.create(formData).subscribe(
      () => {
        this.modalRef.close(true);
      },
      error => this.errorHandler.handle(error)
    );
  }
}
