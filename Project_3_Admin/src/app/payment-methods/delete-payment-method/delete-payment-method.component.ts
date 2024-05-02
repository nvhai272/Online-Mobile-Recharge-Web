import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethodService } from '../../Services/payment-method.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-payment-method',
  standalone: true,
  imports: [],
  templateUrl: './delete-payment-method.component.html',
  styleUrl: './delete-payment-method.component.css'
})
export class DeletePaymentMethodComponent {

  targetUrl: string = '/payment-methods';

  id!: any;
  isDeleted: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private paymentService: PaymentMethodService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    var inputData = {
      isDeleted: this.isDeleted
    };

    this.paymentService.deletePaymentMethod(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });

    this.router.navigate([this.targetUrl]);
    this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Deleted successfully.', 'Success');
  }
}
