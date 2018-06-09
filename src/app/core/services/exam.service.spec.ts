import { inject, TestBed } from '@angular/core/testing';

import { ExamService } from './exam.service';

// TODO: fix test
xdescribe('ExamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamService]
    });
  });

  it(
    'should be created',
    inject([ExamService], (service: ExamService) => {
      expect(service).toBeTruthy();
    })
  );
});
