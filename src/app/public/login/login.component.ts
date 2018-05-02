import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';

interface ILoginModel {
  emailAddress: string;
  password: string;
}

@Component({
  selector: 'ru-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private errorHandler: HttpErrorHandlerService
  ) {
    this.loginForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = Object.assign(this.loginForm.value) as ILoginModel;

    this.auth
      .login({
        username: formData.emailAddress,
        password: formData.password
      })
      .subscribe(
        token => {
          this.router.navigate(['']);
        },
        error => {
          this.errorHandler.handle(error);
        }
      );
  }
}
