import { Component, OnInit } from '@angular/core';
import { OperatorService } from '../../Services/operator.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../common/footer/footer.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { PaymentMethodService } from '../../Services/payment-method.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-payment-method',
  standalone: true,
  imports: [RouterLink,RouterOutlet, CommonModule, FooterComponent, NavbarComponent, HeaderComponent, FormsModule],
  templateUrl: './create-payment-method.component.html',
  styleUrl: './create-payment-method.component.css'
})
export class CreatePaymentMethodComponent implements OnInit{

  constructor(private paymentService: PaymentMethodService, private toastr: ToastrService, private router: Router) {
  }
  name!: string
  description!: string

  ngOnInit(): void {

  }
  create() {
    var inputdata = {
      name: this.name,
      description: this.description
    }
    this.paymentService.createPaymentMethod(inputdata).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error) => console.log('Error fetching user', error)
    })
    this.router.navigate(['/payment-methods']);
    this.showSuccess();
  }

  showSuccess(){
    this. toastr.success('Saved successfully.', 'Success');
  }
}
