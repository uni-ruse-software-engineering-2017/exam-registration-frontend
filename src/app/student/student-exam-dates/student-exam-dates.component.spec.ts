import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamDatesComponent } from './student-exam-dates.component';

describe('StudentExamDatesComponent', () => {
  let component: StudentExamDatesComponent;
  let fixture: ComponentFixture<StudentExamDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentExamDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
