import { Injectable } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorHandlerService {
  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService
  ) {}

  /**
   * Shows a user-friendly error message when a HTTP request fails.
   *
   * @param error - HTTP error
   */
  handle(error: HttpErrorResponse) {
    // TODO: define application specific error codes handling

    // generic HTTP errors
    switch (error.status) {
      case 400:
        return this._showSnack(this.translate.instant('Bad request'));

      case 401:
        return this._showSnack(
          this.translate.instant('Unauthenticated action')
        );

      case 403:
        return this._showSnack(
          this.translate.instant(`You don't have the required permissions`)
        );

      case 404:
        return this._showSnack(this.translate.instant('Resource not found'));

      case 422:
        return this._showSnack(this.translate.instant('Invalid data provided'));

      case 500:
      case 501:
      case 502:
      case 503:
        return this._showSnack(
          this.translate.instant('An internal server error occurred')
        );

      case -1:
        return this._showSnack(
          this.translate.instant('You appear to be offline')
        );

      default:
        return this._showSnack(
          this.translate.instant(`An unknown error occurred`)
        );
    }
  }

  private _showSnack(msg: string) {
    return this.snackbar.open(
      msg,
      this.translate.instant('Dismiss').toUpperCase(),
      {
        duration: 3500
      }
    );
  }
}
