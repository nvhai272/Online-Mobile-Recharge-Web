import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DetailUserComponent } from '../detail-user/detail-user.component';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { Users } from '../../../types';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [DetailUserComponent,DeleteUserComponent, EditUserComponent ,CreateUserComponent, NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  response: Users[] = []
  constructor(private opService : UserService){}
 
  ngOnInit(): void {
    this.opService.getUsers().subscribe(
     (result: any) => {
       console.log(result);
       this.response = result
     }
    )
  }
}
