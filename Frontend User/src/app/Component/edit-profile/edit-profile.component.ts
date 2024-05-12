import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PaymentMethod, User } from '../../../type';
import { paymentService } from '../../services/paymentMethod';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
// import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [MatSelectModule,FormsModule,ReactiveFormsModule,CommonModule,MatCommonModule,MatFormField,MatLabel,MatDatepickerModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})

export class EditProfileComponent implements OnInit {

  user: User; // Initialize an empty Userss object
  id!: any;
  paymentMethodId! : number;
  paymentMethods: PaymentMethod[] = [];

  constructor(public dialogRef: MatDialogRef<EditProfileComponent>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private method:paymentService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = 1;

    this.getPaymentMethods();

    this.userService.getUser(this.id).subscribe(
      (res: User) => {
        console.log(res);
        this.user = res;
        this.paymentMethodId = this.user.paymentMethodId;

        console.log(this.user) // Assign retrieved data to the Userss object
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
    
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

  edit(): void {
    const inputData = {
      name: this.user.name, // Ensure 'name' property exists in Userss interface
      phone: this.user.phone,
      email: this.user.email,
      dob: this.user.dob,
      address: this.user.address,
      paymentMethodId: this.paymentMethodId,
      paymentInfo: this.user.paymentInfo
    };

    this.userService.updateUser(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });

    this.closeDialog();
    this.router.navigate(['/profile/{{this.id}}']);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Edited successfully.', 'Success');
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
