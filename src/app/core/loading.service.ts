import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class LoadingService {
  private _pendingRequests = 0;

  public loading$ = new ReplaySubject<boolean>();

  start() {
    this._pendingRequests++;
    this.loading$.next(true);
  }

  complete() {
    if (this._pendingRequests > 0) {
      this._pendingRequests--;
    }

    if (this._pendingRequests === 0) {
      this.loading$.next(false);
    }
  }

  isLoading() {
    return this._pendingRequests > 0;
  }
}
