import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorsManagementComponent } from './professors-management.component';

// TODO: fix test
xdescribe('ProfessorsManagementComponent', () => {
  let component: ProfessorsManagementComponent;
  let fixture: ComponentFixture<ProfessorsManagementComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProfessorsManagementComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
