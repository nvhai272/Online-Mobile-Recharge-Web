import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PostpaidPaymenDialogComponent } from '../../Component/postpaid-paymen-dialog/postpaid-paymen-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterOutlet,MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private dialog: MatDialog){}
  
  openPostpaidPaymentDialog() {
    const dialogRef = this.dialog.open(PostpaidPaymenDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      // Handle dialog closure (optional)
    });
  }
}
