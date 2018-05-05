import { async, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AppShellModule } from './app-shell/app-shell.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './core/authentication.service';
import { CoreModule } from './core/core.module';
import { IUserProfile } from './models/authentication-models';

const authServiceStub = {
  userProfile$: of({
    fullName: 'John Doe',
    role: 'STUDENT',
    username: 's136510@stud.uni-ruse.bg'
  } as IUserProfile)
};

describe('AppComponent', () => {
  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          { provide: AuthenticationService, useValue: authServiceStub }
        ],
        imports: [
          AppShellModule,
          TranslateModule.forRoot(),
          RouterTestingModule,
          NoopAnimationsModule
        ]
      }).compileComponents();
    })
  );
  it(
    'should create the app',
    async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
