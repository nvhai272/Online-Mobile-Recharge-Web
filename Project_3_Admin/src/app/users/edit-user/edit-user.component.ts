import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Users } from '../../../types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  user: Users; // Initialize an empty Userss object
  id!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  edit(): void {
    const inputData = {
      name: this.user.name, // Ensure 'name' property exists in Userss interface
      phone: this.user.phone,
      email: this.user.email,
      dob: this.user.dob,
      address: this.user.address
    };
    this.userService.updateUser(this.id, inputData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
    });

    this.router.navigate(['/users']);
    this.showSuccess();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(
      (result: Users) => {
        console.log(result);
        this.user = result; // Assign retrieved data to the Userss object
      },
      (error) => {
        console.error('Error fetching user data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }

  showSuccess() {
    this.toastr.success('Edited successfully.', 'Success');
  }
}
