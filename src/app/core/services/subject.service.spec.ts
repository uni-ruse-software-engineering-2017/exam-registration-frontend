import { inject, TestBed } from '@angular/core/testing';

import { SubjectService } from './subject.service';

// TODO: fix test
xdescribe('SubjectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubjectService]
    });
  });

  it(
    'should be created',
    inject([SubjectService], (service: SubjectService) => {
      expect(service).toBeTruthy();
    })
  );
});
