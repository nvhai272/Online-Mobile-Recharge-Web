import { Component } from '@angular/core';
import { PaymentMethod, Recharge_plan, Transaction, User, currentUser } from '../../../type';
import { ActivatedRoute, Router, RouterConfigOptions } from '@angular/router';
import { Recharge_planService } from '../../services/recharg_plan';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { paymentService } from '../../services/paymentMethod';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TransactionDialogComponent } from '../transaction-dialog/transaction-dialog.component';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css'
})
export class DetailPageComponent {

  paymentMethods: PaymentMethod[] = [];
  recharge_plan: Recharge_plan | null = null;
  Phone!: string;
  PaymentMethodId!: number;
  Price: number;

  isLoggedIn = false;
  userId: number;
  userName: string;
  showNavbar: boolean = true;
  currentUser: User;

  constructor(private activatedRoute: ActivatedRoute, private recharg_plan: Recharge_planService,
    private transaction: TransactionService, private method: paymentService, private dialog: MatDialog,
    private router: Router,
    private storageService: StorageService, 
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getRechargePlanDetails();
    this.getPaymentMethods();
    this.getUserInfo();
  }

  getRechargePlanDetails(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.recharg_plan.get(id)
        .subscribe(
          (data: Recharge_plan) => {
            this.recharge_plan = data;
            this.Price = this.recharge_plan.price;
          },
          (error: any) => {
            console.error('Error fetching recharge plan details:', error);
          }
        );
    } else {
      console.error('Recharge plan ID not provided.');
    }
  }

  getUserInfo():void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
      this.userId = this.storageService.getUser().userId;
      console.log(this.userId);

      this.userService.getUser(this.userId).subscribe(
        (res: User) => {
          console.log(res);
          this.currentUser = res;
          this.Phone = this.currentUser.phone;
          // this.PaymentMethodId = this.currentUser.paymentMethodId;
          console.log(this.currentUser) 
        },
        (error) => {
          console.error('Error fetching user data:', error);
          // Handle the error (e.g., show an error message)
        }
      );
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
      RechargePlanPrice: this.Price,
      DiscountAmount: this.Price * 0.05,
      TransactionAmount: this.Price * 0.95, // Use fetched price from recharge_plan
      // ServiceId: 1, // Assuming you have a default service name
      ServiceId: 1,
      RechargePlanId: this.recharge_plan?.id, // Use fetched name from recharge_plan
      PaymentMethodId: this.PaymentMethodId,
      UserId: this.userId
    }

    this.transaction.create(inputdata).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error('Error creating transaction:', err);
      }
      
    })
    
    this.router.navigate(['/']);
    this.openTransactionDialog();
  }

  openTransactionDialog() {
    this.dialog.open(TransactionDialogComponent);
  }

  getFormattedCurrency(formatValue: number) {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(formatValue);
  }
}
