import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpErrorHandlerService } from '../../../../core/http-error-handler.service';
import { PhoneNumberValidator } from '../../../../core/validators/phone-number.validator';
import { INewProfessor } from '../../../../models/professor.model';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'ru-add-professor-modal',
  templateUrl: './add-professor-modal.component.html',
  styleUrls: ['./add-professor-modal.component.scss']
})
export class AddProfessorModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    public modalRef: MatDialogRef<AddProfessorModalComponent>,
    private fb: FormBuilder,
    private errorHandler: HttpErrorHandlerService,
    private professorService: ProfessorService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      cabinet: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.required, PhoneNumberValidator]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return false;
    }

    const formData = this.form.value as INewProfessor;

    return this.professorService.create(formData).subscribe(
      () => {
        this.modalRef.close(true);
      },
      error => this.errorHandler.handle(error)
    );
  }
}
