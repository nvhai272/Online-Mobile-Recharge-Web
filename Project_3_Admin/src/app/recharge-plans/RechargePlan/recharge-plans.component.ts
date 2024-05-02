import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AddRechargePlanComponent } from '../add-recharge-plan/add-recharge-plan.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RechargePlanService } from '../../Services/recharge-plan.service';

@Component({
  selector: 'app-recharge-plans',
  standalone: true,
  imports: [AddRechargePlanComponent, NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './recharge-plans.component.html',
  styleUrl: './recharge-plans.component.css'
})
export class RechargePlansComponent implements OnInit {

  posts: any = [];

  constructor(private http: HttpClient) {}

  private rechargePlanService = inject(RechargePlanService);
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.rechargePlanService.getRechargePlans().subscribe({
      next:(posts:any) =>{
        this.posts = posts;
        console.log('Posts fetched successfully');

      },
      error: (error) => console.log('Error fetching posts',error)

    });
  }
}
