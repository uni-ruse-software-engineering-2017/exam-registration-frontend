import { inject, TestBed } from '@angular/core/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '@ngx-translate/core';
import { MaterialComponentsModule } from '../shared/material-components.module';
import { HttpErrorHandlerService } from './http-error-handler.service';

const TranslateServiceMock = {
  instant(str: string) {
    return str;
  }
};

describe('HttpErrorHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialComponentsModule, NoopAnimationsModule],
      providers: [
        HttpErrorHandlerService,
        MatSnackBar,
        { provide: TranslateService, useValue: TranslateServiceMock }
      ]
    });
  });

  it(
    'should be created',
    inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    '#handle should handle unknown HTTP status codes',
    inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
      expect(
        service.handle(
          new HttpErrorResponse({
            status: 418,
            statusText: `I'm a teapot`
          })
        ).instance.data.message
      ).toEqual('An unknown error occurred');
    })
  );

  it(
    '#handle should display a dismiss button',
    inject([HttpErrorHandlerService], (service: HttpErrorHandlerService) => {
      expect(
        service.handle(
          new HttpErrorResponse({
            status: 404,
            statusText: `Not found`
          })
        ).instance.data.action
      ).toEqual('Dismiss'.toUpperCase());
    })
  );
});
