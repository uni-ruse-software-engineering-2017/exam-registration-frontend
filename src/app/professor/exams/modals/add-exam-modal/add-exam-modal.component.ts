import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRef } from '@angular/material';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { ExamService, INewExam } from '../../../../core/services/exam.service';

@Component({
  selector: 'ru-add-exam-modal',
  templateUrl: './add-exam-modal.component.html',
  styleUrls: ['./add-exam-modal.component.scss']
})
export class AddExamModalComponent implements OnInit {
  readonly MIN_SEATS = 1;
  readonly MAX_SEATS = 40;
  readonly DEFAULT_SEATS = 20;

  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: { date: Date; subjectId: number },
    public modalRef: MatDialogRef<AddExamModalComponent>,
    private examService: ExamService,
    private errorHandler: HttpErrorHandlerService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      startTime: ['08:00', Validators.required],
      endTime: ['10:00', Validators.required],
      hall: ['', Validators.required],
      maxSeats: [
        this.DEFAULT_SEATS,
        [
          Validators.required,
          Validators.min(this.MIN_SEATS),
          Validators.max(this.MAX_SEATS)
        ]
      ]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const formData = {
      hall: this.form.value.hall,
      maxSeats: this.form.value.maxSeats,
      startTime: this._toUnixTimestamp(this.form.value.startTime),
      endTime: this._toUnixTimestamp(this.form.value.endTime),
      subjectId: this.dialogData.subjectId
    } as INewExam;

    this.examService.create(formData).subscribe(
      newExam => {
        this.modalRef.close(newExam);
      },
      error => this.errorHandler.handle(error)
    );
  }

  _toUnixTimestamp(timeString: string) {
    const dateString = this.dialogData.date
      .toISOString()
      .replace(/T.*/, 'T' + timeString);

    return new Date(dateString).getTime();
  }
}
