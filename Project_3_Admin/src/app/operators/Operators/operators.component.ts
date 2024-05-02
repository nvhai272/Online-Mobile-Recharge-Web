import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { OperatorService } from '../../Services/operator.service';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { CreateOperatorComponent } from '../create-operator/create-operator.component';

@Component({
  selector: 'app-operators',
  standalone: true,
  imports: [CreateOperatorComponent, NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './operators.component.html',
  styleUrl: './operators.component.css'
})
export class OperatorsComponent implements OnInit {
  posts: any = [];

  constructor(private http: HttpClient) {}

  private operatorService = inject(OperatorService);
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.operatorService.getOperators().subscribe({
      next:(posts:any) =>{
        this.posts = posts;
        console.log('Posts fetched successfully');

      },
      error: (error) => console.log('Error fetching posts',error)

    });
  }
}
