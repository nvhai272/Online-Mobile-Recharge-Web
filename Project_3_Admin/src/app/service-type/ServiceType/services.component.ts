import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ServiceTypeService } from '../../Services/service-type.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  posts: any = [];

  constructor(private http: HttpClient) {}

  private serviceTypeService = inject(ServiceTypeService);
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.serviceTypeService.getServiceMethods().subscribe({
      next:(posts:any) =>{
        this.posts = posts;
        console.log('Posts fetched successfully');

      },
      error: (error) => console.log('Error fetching posts',error)

    });
  }
}