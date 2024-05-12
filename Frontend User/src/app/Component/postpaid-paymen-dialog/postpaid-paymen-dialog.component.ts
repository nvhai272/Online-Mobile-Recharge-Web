import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PaymentMethod } from '../../../type';
import { TransactionService } from '../../services/transaction.service';
import { paymentService } from '../../services/paymentMethod';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';

@Component({
  selector: 'app-postpaid-paymen-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './postpaid-paymen-dialog.component.html',
  styleUrl: './postpaid-paymen-dialog.component.css'
})
export class PostpaidPaymenDialogComponent implements OnInit {

  phone!: string;
  // cardnumber: number;
  amount!: number;
  paymentMethodId!: number;
  paymentDetail: number;
  paymentMethods: PaymentMethod[] = [];

  constructor(
    public dialogRef: MatDialogRef<PostpaidPaymenDialogComponent>,
    private transaction: TransactionService, private method: paymentService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog
    // @Inject(MatDialogConfig) public config: MatDialogConfig
  ) { }

  ngOnInit(): void {
    this.getPaymentMethods();
  }

  onSubmit() {
    var inputdata = {
      Phone: this.phone,
      TransactionAmount: this.amount,
      // ServiceId: 1, // Assuming you have a default service name
      ServiceId: 2,
      PaymentMethodId: this.paymentMethodId,
      IsSucceeded: true

    }
    this.transaction.create(inputdata).subscribe({

      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error('Error creating transaction:', err);
      }
    })
    this.dialogRef.close(); // Close the dialog
    
    this.openTransactionDialog();
    // this.showSuccess();
  }

  getPaymentMethods(): void {
    this.method.getAll().subscribe({
      next: (data) => {
        this.paymentMethods = data;
        console.log(data);
      },
      error: (e) => console.error('Error fetching payment method')
    });
  }

  openTransactionDialog() {
    this.dialog.open(TransactionDialogComponent);
  }

  // showSuccess(){
  //   this. toastr.success('Successfully paid.', 'Success');
  // }
}
