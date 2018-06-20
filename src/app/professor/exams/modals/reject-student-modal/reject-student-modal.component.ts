import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { IEnrollmentRequest } from '../../../../core/models/http-responses';
import { ExamService } from '../../../../core/services/exam.service';

@Component({
  selector: 'ru-reject-student-modal',
  templateUrl: './reject-student-modal.component.html',
  styleUrls: ['./reject-student-modal.component.scss']
})
export class RejectStudentModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { enrollment: IEnrollmentRequest; examId: number },
    private examService: ExamService,
    public modalRef: MatDialogRef<RejectStudentModalComponent>,
    private fb: FormBuilder,
    private errorHandler: HttpErrorHandlerService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const reason = this.form.get('reason').value;

    return this.examService
      .changeEnrollmentStatus(
        this.data.examId,
        this.data.enrollment.student.id,
        'REJECTED',
        reason
      )
      .subscribe(
        updatedExam => this.modalRef.close(updatedExam),
        error => this.errorHandler.handle(error)
      );
  }
}
