import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs/observable/of';
import { AuthenticationService } from '../../core/authentication.service';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';

const FORM_DATA_VALID = {
  emailAddress: 's136510@stud.uni-ruse.bg'
};

const FORM_DATA_INVALID = {
  emailAddress: ''
};

const authServiceSpy = jasmine.createSpyObj('AuthenticationService', [
  'signUp'
]);
authServiceSpy.signUp.and.returnValue(of(true));

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SignUpComponent],
        providers: [
          {
            provide: AuthenticationService,
            useValue: authServiceSpy
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    '#onSubmit should not call auth.signUp() when form data is invalid',
    fakeAsync(() => {
      component.signUpForm.setValue(FORM_DATA_INVALID);
      fixture.detectChanges();

      component.onSubmit();
      expect(authServiceSpy.signUp.calls.count()).toBe(0);
    })
  );

  it(
    '#onSubmit should call auth.signUp() when form data is valid',
    fakeAsync(() => {
      component.signUpForm.setValue(FORM_DATA_VALID);
      fixture.detectChanges();

      component.onSubmit();
      expect(authServiceSpy.signUp.calls.count()).toBe(1);
    })
  );

  afterEach(() => {
    authServiceSpy.signUp.calls.reset();
  });
});
