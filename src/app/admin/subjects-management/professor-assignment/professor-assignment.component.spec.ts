import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorAssignmentComponent } from './professor-assignment.component';

describe('ProfessorAssignmentComponent', () => {
  let component: ProfessorAssignmentComponent;
  let fixture: ComponentFixture<ProfessorAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
