import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { Location } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AuthenticationService } from '../../core/authentication.service';
import { HttpErrorHandlerService } from '../../core/http-error-handler.service';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';

const FORM_DATA_VALID = {
  emailAddress: 's136510@stud.uni-ruse.bg',
  password: '12345678',
  repeatPassword: '12345678'
};

const FORM_DATA_PASSWORDS_MISMATCH = Object.assign({}, FORM_DATA_VALID, {
  repeatPassword: FORM_DATA_VALID.password + 'abc'
});

const FORM_DATA_MISSING = {
  emailAddress: '',
  password: '',
  repeatPassword: ''
};

const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
  'signUp'
]);

const errorHandlerSpy = jasmine.createSpyObj('HttpErrorHandlerService', [
  'handle'
]);

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let location: Location;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SignUpComponent],
        providers: [
          {
            provide: AuthenticationService,
            useValue: authServiceSpy
          },
          {
            provide: HttpErrorHandlerService,
            useValue: errorHandlerSpy
          }
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
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    '#onSubmit should not call auth.signUp() when form data is missing',
    fakeAsync(() => {
      component.signUpForm.setValue(FORM_DATA_MISSING);
      fixture.detectChanges();

      component.onSubmit();
      expect(authServiceSpy.signUp.calls.count()).toBe(0);
    })
  );

  it(
    '#onSubmit should not call auth.signUp() when passwords do not match',
    fakeAsync(() => {
      component.signUpForm.setValue(FORM_DATA_PASSWORDS_MISMATCH);
      fixture.detectChanges();

      component.onSubmit();
      expect(authServiceSpy.signUp.calls.count()).toBe(0);
    })
  );

  it(
    '#onSubmit should call auth.signUp() when form data is valid',
    fakeAsync(() => {
      authServiceSpy.signUp.and.returnValue(of(true));

      component.signUpForm.setValue(FORM_DATA_VALID);
      fixture.detectChanges();

      component.onSubmit();

      tick(100);

      expect(authServiceSpy.signUp.calls.count()).toBe(1);
    })
  );

  it(
    '#onSubmit should redirect to "/" on successful sign up',
    fakeAsync(() => {
      authServiceSpy.signUp.and.returnValue(of(true));

      component.signUpForm.setValue(FORM_DATA_VALID);
      fixture.detectChanges();

      component.onSubmit();

      tick(200);

      expect(location.path()).toBe('/');
    })
  );

  afterEach(() => {
    authServiceSpy.signUp.calls.reset();
    errorHandlerSpy.handle.calls.reset();
  });
});
