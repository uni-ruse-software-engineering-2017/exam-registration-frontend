import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { PhoneNumberValidator } from '../../../../core/validators/phone-number.validator';
import {
  INewProfessor,
  IProfessor,
  IProfessorBase
} from '../../../../models/professor.model';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'ru-edit-professor-modal',
  templateUrl: './edit-professor-modal.component.html',
  styleUrls: ['./edit-professor-modal.component.scss']
})
export class EditProfessorModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public professor: IProfessor,
    public modalRef: MatDialogRef<EditProfessorModalComponent>,
    private fb: FormBuilder,
    private errorHandler: HttpErrorHandlerService,
    private professorService: ProfessorService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fullName: [this.professor.fullName, Validators.required],
      cabinet: [
        this.professor.cabinet,
        [Validators.required, Validators.maxLength(10)]
      ],
      phoneNumber: [
        this.professor.phoneNumber,
        [Validators.required, PhoneNumberValidator]
      ]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value as IProfessorBase;

    return this.professorService.update(this.professor.id, formData).subscribe(
      () => {
        this.modalRef.close(true);
      },
      error => this.errorHandler.handle(error)
    );
  }
}
