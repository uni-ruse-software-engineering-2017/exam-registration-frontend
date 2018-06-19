import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorExamDateDetailsComponent } from './professor-exam-date-details.component';

describe('ProfessorExamDateDetailsComponent', () => {
  let component: ProfessorExamDateDetailsComponent;
  let fixture: ComponentFixture<ProfessorExamDateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorExamDateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorExamDateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
