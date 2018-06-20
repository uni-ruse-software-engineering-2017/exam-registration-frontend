import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectStudentModalComponent } from './reject-student-modal.component';

// TODO: fix test
xdescribe('RejectStudentModalComponent', () => {
  let component: RejectStudentModalComponent;
  let fixture: ComponentFixture<RejectStudentModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RejectStudentModalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectStudentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
