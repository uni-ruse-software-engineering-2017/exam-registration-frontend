import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsArchiveComponent } from './exams-archive.component';

describe('ExamsArchiveComponent', () => {
  let component: ExamsArchiveComponent;
  let fixture: ComponentFixture<ExamsArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamsArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamsArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
