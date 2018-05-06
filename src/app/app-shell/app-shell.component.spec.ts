import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationService } from '../core/authentication.service';
import { LoadingService } from '../core/loading.service';
import { IUserProfile } from '../models/authentication-models';
import { SharedModule } from '../shared/shared.module';
import { AppShellComponent } from './app-shell.component';
import { NavigationComponent } from './navigation/navigation.component';

const FAKE_USER = {
  fullName: 'John Doe',
  role: 'STUDENT',
  username: 's136510@stud.uni-ruse.bg'
} as IUserProfile;

describe('AppShellComponent', () => {
  let component: AppShellComponent;
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppShellComponent, NavigationComponent],
        imports: [
          NoopAnimationsModule,
          SharedModule,
          LayoutModule,
          RouterTestingModule,
          TranslateModule.forRoot()
        ],
        providers: [LoadingService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should hide toolbar if the user is not logged in',
    fakeAsync(() => {
      component.userProfile = null;
      fixture.detectChanges();
      tick();

      expect(component.shouldHideToolbar()).toBeTruthy();
    })
  );

  it(
    'should show toolbar if the user is logged in',
    fakeAsync(() => {
      component.userProfile = FAKE_USER;
      fixture.detectChanges();
      tick();

      expect(component.shouldHideToolbar()).toBeFalsy();
    })
  );

  /**
   * TODO: Mock 'MediaQueryList' because it cannot run in Chrome Headless
   */
});
