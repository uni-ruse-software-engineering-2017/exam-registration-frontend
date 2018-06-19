import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamDatesComponent } from './professor-exam-dates.component';

// TODO: fix test
xdescribe('ProfessorExamDatesComponent', () => {
  let component: ProfessorExamDatesComponent;
  let fixture: ComponentFixture<ProfessorExamDatesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessorExamDatesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
