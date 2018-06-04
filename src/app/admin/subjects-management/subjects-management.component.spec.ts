import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { SubjectsManagementComponent } from './subjects-management.component';

// TODO: fix test
xdescribe('SubjectsManagementComponent', () => {
  let component: SubjectsManagementComponent;
  let fixture: ComponentFixture<SubjectsManagementComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SubjectsManagementComponent],
        imports: [SharedModule, TranslateModule.forRoot()]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
