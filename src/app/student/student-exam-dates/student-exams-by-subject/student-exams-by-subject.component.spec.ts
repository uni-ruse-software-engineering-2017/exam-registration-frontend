import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentExamsBySubjectComponent } from './student-exams-by-subject.component';

// TODO: fix test
xdescribe('StudentExamsBySubjectComponent', () => {
  let component: StudentExamsBySubjectComponent;
  let fixture: ComponentFixture<StudentExamsBySubjectComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [StudentExamsBySubjectComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentExamsBySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
