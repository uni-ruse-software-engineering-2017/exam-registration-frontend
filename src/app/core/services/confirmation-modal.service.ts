import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Injectable()
export class ConfirmationModalService {
  constructor(private dialog: MatDialog) {}

  public confirm(title: string, message?: string): Observable<boolean> {
    let dialogRef: MatDialogRef<ConfirmModalComponent>;

    dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
