import { inject, TestBed } from '@angular/core/testing';

import { ProfessorService } from './professor.service';

// TODO: fix test
xdescribe('ProfessorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfessorService]
    });
  });

  it(
    'should be created',
    inject([ProfessorService], (service: ProfessorService) => {
      expect(service).toBeTruthy();
    })
  );
});
