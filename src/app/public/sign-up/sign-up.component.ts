import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

interface ISignUpFormData {
  emailAddress: string;
}

@Component({
  selector: 'ru-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      emailAddress: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const formData = Object.assign(this.signUpForm.value) as ISignUpFormData;

    this.auth.signUp(formData.emailAddress).subscribe(user => {
      this.router.navigate(['']);
    });
  }
}
