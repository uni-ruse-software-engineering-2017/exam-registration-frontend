import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamDatesBySubjectComponent } from './professor-exam-dates-by-subject.component';

// TODO: fix test
xdescribe('ProfessorExamDatesBySubjectComponent', () => {
  let component: ProfessorExamDatesBySubjectComponent;
  let fixture: ComponentFixture<ProfessorExamDatesBySubjectComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessorExamDatesBySubjectComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamDatesBySubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
