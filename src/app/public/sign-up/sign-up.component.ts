import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { MatchPasswordsValidator } from '../../core/validators/match-passwords.validator';

interface ISignUpFormData {
  emailAddress: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'ru-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  PASSWORD_MIN_LENGTH = 8;
  signUpForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private errorHandler: HttpErrorHandlerService,
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.PASSWORD_MIN_LENGTH)
      ]),
      repeatPassword: new FormControl('')
    });

    // sets the validators outside the constructor because
    // the reference to the constructed form group is required
    this.signUpForm.controls['repeatPassword'].setValidators([
      Validators.required,
      MatchPasswordsValidator(this.signUpForm)
    ]);
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return false;
    }

    const formData = this.signUpForm.value as ISignUpFormData;

    return this.auth
      .signUp({
        username: formData.emailAddress,
        password: formData.password
      })
      .subscribe(
        response => {
          this._showSnack(
            this.translate.instant(
              'Instructions for account activation were sent to your email address'
            )
          );

          this.router.navigate(['']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 409) {
            this._showSnack(
              this.translate.instant(
                'User with that email address already exists'
              ),
              3500
            );
          } else {
            this.errorHandler.handle(error);
          }
        }
      );
  }

  _showSnack(message: string, duration?: number) {
    this.snackbar.open(
      message,
      this.translate.instant('Dismiss').toUpperCase(),
      {
        duration: duration || 5000
      }
    );
  }
}
