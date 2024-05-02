import { Component } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersComponent } from '../User/users.component';
import { Transaction, Users } from '../../../types';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../Services/transaction.service';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [FormsModule, UsersComponent, NavbarComponent, HeaderComponent, FooterComponent, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {

  user: Users; // Initialize an empty Userss object
  transaction: Transaction[] = [];
  id!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private transService: TransactionService
  ) { }

  ngOnInit(): void {
    // this.loadUserData();
    // this.loadUserTrans(); 
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUser(this.id).subscribe(
      (res: Users) => {
        console.log(res);
        this.user = res;
        console.log(this.user) // Assign retrieved data to the Userss object
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );

    this.transService.getUserTransaction(this.id).subscribe(
      (result: any) => {
        console.log(result);
        this.transaction = result;
        console.log(this.transaction) // Assign retrieved data to the Userss object
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}
