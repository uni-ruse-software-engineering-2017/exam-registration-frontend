import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessorModalComponent } from './add-professor-modal.component';

// TODO: fix test
xdescribe('AddProfessorModalComponent', () => {
  let component: AddProfessorModalComponent;
  let fixture: ComponentFixture<AddProfessorModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddProfessorModalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
