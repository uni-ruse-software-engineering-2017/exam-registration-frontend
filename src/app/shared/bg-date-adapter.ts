import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material';

@Injectable()
export class BulgarianDateAdapter extends NativeDateAdapter {
  /**
   * In Bulgaria the week starts on Monday and finishes on Sunday.
   */
  getFirstDayOfWeek(): number {
    return 1;
  }
}
