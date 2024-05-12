import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-transaction-dialog',
  standalone: true,
  imports: [MatDialogModule, RouterLink, RouterOutlet],
  templateUrl: './transaction-dialog.component.html',
  styleUrl: './transaction-dialog.component.css'
})
export class TransactionDialogComponent {

  constructor(public dialogRef: MatDialogRef<TransactionDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
