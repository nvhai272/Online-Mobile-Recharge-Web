import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuItem, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Transaction, User } from '../../../type';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TransactionService } from '../../services/transaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, FormsModule, CommonModule, MatCommonModule, MatOptionModule, MatSelectModule, MatMenuModule, MatMenuItem, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  hideTab: boolean = false;
  selectedTabIndex: number = 0;

  user: User; // Initialize an empty Userss object
  transaction: Transaction[] = [];
  id!: any;

  newPassword: string;
  confirmPassword: string;

  toggleTabVisibility() {
    this.hideTab = !this.hideTab;
    // Optionally, you can reset the selected tab index when hiding the tab
    if (this.hideTab) {
      this.selectedTabIndex = -1;
    }
  }

  constructor(public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private transService: TransactionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userService.getUser(this.id).subscribe(
      (res: User) => {
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

  openEditModal(): void {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '500px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the modal is closed
      console.log('The dialog was closed');
    });
  }

  changePassword() {
    if (this.newPassword == this.confirmPassword) {

      const inputdata = {
        password: this.newPassword
      }

      this.userService.changePassword(this.id, inputdata).subscribe({
        next: (res: any) => {
          console.log(res);
        },
      });

      this.router.navigate(['/']);
    }
  }
  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: res => {
  //       console.log(res);
  //       this.storageService.clean();

  //       window.location.reload();
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }

}
