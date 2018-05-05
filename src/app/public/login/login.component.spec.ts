import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

const FORM_DATA = {
  emailAddress: 's136510@stud.uni-ruse.bg',
  password: '123456'
};

const AUTH_ERROR_RESPONSE = new HttpErrorResponse({
  status: 401,
  error: 'Invalid credentials.',
  statusText: 'Unauthorized'
});

const errorHandlerSpy = jasmine.createSpyObj('HttpErrorHandlerService', [
  'handle'
]);

const AuthenticationServiceMock = {
  timesCalled: 0,

  login(credentials: { username: string; password: string }) {
    this.timesCalled++;

    if (
      credentials.username === FORM_DATA.emailAddress &&
      credentials.password === FORM_DATA.password
    ) {
      return of('jwt_token');
    }

    return _throw(AUTH_ERROR_RESPONSE);
  },

  reset() {
    this.timesCalled = 0;
  }
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let location: Location;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [
          {
            provide: AuthenticationService,
            useValue: AuthenticationServiceMock
          },
          { provide: HttpErrorHandlerService, useValue: errorHandlerSpy }
        ],
        imports: [
          TranslateModule.forRoot(),
          SharedModule,
          RouterTestingModule,
          NoopAnimationsModule
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    '#onSubmit should not call this.auth.login() when email address is invalid',
    fakeAsync(() => {
      component.loginForm.setValue({
        emailAddress: 'notanemail',
        password: '123456'
      });

      fixture.detectChanges();

      expect(component.onSubmit()).toBeFalsy();
      expect(AuthenticationServiceMock.timesCalled === 0);
    })
  );

  it(
    '#onSubmit should not call this.auth.login() when password is missing',
    fakeAsync(() => {
      component.loginForm.setValue({
        emailAddress: 's136510@stud.uni-ruse.bg',
        password: ''
      });

      fixture.detectChanges();

      expect(component.onSubmit()).toBeFalsy();
      expect(AuthenticationServiceMock.timesCalled === 0);
    })
  );

  it(
    '#onSubmit should call this.auth.login() once when all form data is valid',
    fakeAsync(() => {
      component.loginForm.setValue(FORM_DATA);

      fixture.detectChanges();

      expect(component.onSubmit()).toBeTruthy();
      expect(AuthenticationServiceMock.timesCalled === 1);
    })
  );

  it(
    '#onSubmit should handle authentication errors',
    fakeAsync(() => {
      component.loginForm.setValue({
        emailAddress: 'invalid@example.com',
        password: 'wrongpassword'
      });

      fixture.detectChanges();

      expect(component.onSubmit()).toBeTruthy();
      expect(AuthenticationServiceMock.timesCalled === 1);
      expect(errorHandlerSpy.handle.calls.count()).toBe(1);
    })
  );

  it(
    '#onSubmit should redirect to the home page when authenticaton is successful',
    fakeAsync(() => {
      component.loginForm.setValue(FORM_DATA);

      fixture.detectChanges();

      expect(component.onSubmit()).toBeTruthy();
      expect(AuthenticationServiceMock.timesCalled === 1);
      expect(errorHandlerSpy.handle.calls.count()).toBe(0);

      tick();

      expect(location.path()).toBe('/');
    })
  );

  afterEach(() => {
    AuthenticationServiceMock.reset();
    errorHandlerSpy.handle.calls.reset();
  });
});
