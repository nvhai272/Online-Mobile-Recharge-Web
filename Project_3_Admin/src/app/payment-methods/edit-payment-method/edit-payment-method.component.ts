import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentMethodService } from '../../Services/payment-method.service';
import { PaymentMethod } from '../../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-payment-method',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule, FormsModule],
  templateUrl: './edit-payment-method.component.html',
  styleUrl: './edit-payment-method.component.css'
})
export class EditPaymentMethodComponent implements OnInit {
  payment: PaymentMethod; 
  id!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentMethodService,
    private toastr: ToastrService, private router: Router
  ) {}

  edit(): void {
    const inputData = {
      name: this.payment.name,
      description: this.payment.description
    };
    this.paymentService.updatePaymentMethod(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });

    this.router.navigate(['/payment-methods']);
    this.showSuccess();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.paymentService.getPaymentMethod(this.id).subscribe(
      (result: PaymentMethod) => {
        console.log(result);
        this.payment = result; 
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }

  showSuccess(){
    this. toastr.success('Edited successfully.', 'Success');
  }
}
