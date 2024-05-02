import { Component } from '@angular/core';
import { PaymentMethod, Recharge_plan } from '../../../type';
import { ActivatedRoute } from '@angular/router';
import { Recharge_planService } from '../../services/recharg_plan';
import { FormsModule } from '@angular/forms';
import { transactionService } from '../../services/transaction';
import { paymentService } from '../../services/paymentMethod';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

  // currentRecharge: Recharge_plan = {
  //   name: '',
  //   talkTime: 0,
  //   validity: 0,
  //   price: 0,
  //   description: ''
  // };
  paymentMethods: PaymentMethod[] = [];
  recharge_plan: Recharge_plan | null = null;
  constructor(private activatedRoute: ActivatedRoute, private recharg_plan: Recharge_planService, private transaction: transactionService,private method:paymentService) { }
  Phone!: string;
    // transactionAmount !: number;
  // serviceName = 'PostPay';
  // rechargePlanName !: string ;
  PaymentMethodId!: number;
  ngOnInit(): void {
    this.getRechargePlanDetails();
    this.getPaymentMethods();
  }
  getRechargePlanDetails(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.recharg_plan.get(id)
        .subscribe(
          (data: Recharge_plan) => {
            this.recharge_plan = data;
        
          },
          (error: any) => {
            console.error('Error fetching recharge plan details:', error);
          }
        );
    } else {
      console.error('Recharge plan ID not provided.');
    }
  }
  getPaymentMethods(): void {
    this.method.getAll().subscribe({
      next: (data) => {
        this.paymentMethods = data;
        console.log(data);
      },
      error: (e) => console.error('Error fetching recharge plan details:')
    });
  }

  create(): void {
    var inputdata = {
      Phone: this.Phone,
      TransactionAmount: this.recharge_plan?.price, // Use fetched price from recharge_plan
      ServiceId: 1, // Assuming you have a default service name
      RechargePlanId: this.recharge_plan?.id, // Use fetched name from recharge_plan
      PaymentMethodId: this.PaymentMethodId,
      IsSucceeded:true

    }
    this.transaction.create(inputdata).subscribe({

      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error('Error creating transaction:', err);
      }
    })
  }

}
