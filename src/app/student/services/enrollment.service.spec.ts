import { inject, TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollment.service';

// TODO: fix test
xdescribe('EnrollmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnrollmentService]
    });
  });

  it(
    'should be created',
    inject([EnrollmentService], (service: EnrollmentService) => {
      expect(service).toBeTruthy();
    })
  );
});
