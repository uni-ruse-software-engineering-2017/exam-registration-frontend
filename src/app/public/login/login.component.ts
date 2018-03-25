import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/authentication.service';

interface ILoginModel {
  emailAddress: string;
  password: string;
}

@Component({
  selector: 'ru-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    const formData = Object.assign(this.loginForm.value) as ILoginModel;

    this.auth
      .login({
        username: formData.emailAddress,
        password: formData.password
      })
      .subscribe(user => {
        this.router.navigate(['']);
      });
  }
}
