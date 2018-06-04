import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'ru-confirmation-modal',
  template: `
    <h1 class="mat-title">{{ title }}</h1>
    <p>{{ message }}</p>
    <section class="actions">
      <button mat-button (click)="dialogRef.close(false)">
        <span translate>Cancel</span>
      </button>
      <button mat-raised-button color="primary" (click)="dialogRef.close(true)">
        <span translate>Confirm</span>
      </button>
    </section>
  `,
  styles: [
    `
    .actions {
      margin-top: 16px;
      text-align: right;
    }

    button {
      text-transform: uppercase;
      margin-right: 16px;
    }
  `
  ]
})
export class ConfirmModalComponent {
  @Input() title = '';
  @Input() message = '';

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) {}
}
