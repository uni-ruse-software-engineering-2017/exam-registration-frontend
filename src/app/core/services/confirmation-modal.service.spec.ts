import { inject, TestBed } from '@angular/core/testing';
import { ConfirmationModalService } from './confirmation-modal.service';

// TODO: fix test
xdescribe('ConfirmationModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationModalService]
    });
  });

  it(
    'should be created',
    inject([ConfirmationModalService], (service: ConfirmationModalService) => {
      expect(service).toBeTruthy();
    })
  );
});
