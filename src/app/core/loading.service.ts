import { Injectable } from '@angular/core';

@Injectable()
export class LoadingService {
  private _pendingRequests = 0;

  start() {
    this._pendingRequests++;
  }

  complete() {
    if (this._pendingRequests > 0) {
      this._pendingRequests--;
    }
  }

  isLoading() {
    return this._pendingRequests > 0;
  }
}
