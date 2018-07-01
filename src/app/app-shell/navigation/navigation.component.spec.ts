import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IUserProfile } from '../../models/authentication-models';
import { SharedModule } from '../../shared/shared.module';
import { NavigationComponent } from './navigation.component';

const FAKE_USER = {
  fullName: 'John Doe',
  role: 'STUDENT',
  username: 's136510@stud.uni-ruse.bg'
} as IUserProfile;

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [NavigationComponent],
        imports: [SharedModule, RouterTestingModule, TranslateModule.forRoot()]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    `should display the user's email address`,
    fakeAsync(() => {
      component.userDetails = FAKE_USER;
      fixture.detectChanges();
      const debugElement = fixture.debugElement;
      const htmlElement = debugElement.nativeElement;

      const usernameElement = htmlElement.querySelector(
        '.user-details__username'
      );
      expect((usernameElement.textContent as string).trim()).toEqual(
        FAKE_USER.fullName
      );
    })
  );

  it(
    `should display the user's role as an icon`,
    fakeAsync(() => {
      component.userDetails = FAKE_USER;
      fixture.detectChanges();

      const debugElement = fixture.debugElement;
      const htmlElement = debugElement.nativeElement;

      const userRoleElement = htmlElement.querySelector(
        '.user-details__role'
      ) as HTMLElement;
      const icon = userRoleElement.querySelector('mat-icon') as HTMLElement;

      expect(icon.textContent === 'school');

      component.userDetails = Object.assign(FAKE_USER, { role: 'PROFESSOR' });
      fixture.detectChanges();

      expect(icon.textContent === 'account_circle');

      component.userDetails = Object.assign(FAKE_USER, {
        role: 'ADMINISTRATOR'
      });
      fixture.detectChanges();
      expect(icon.textContent === 'build');
    })
  );
});
