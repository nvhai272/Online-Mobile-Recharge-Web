import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FeedbackService } from '../Services/feedback.service';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './feedbacks.component.html',
  styleUrl: './feedbacks.component.css'
})
export class FeedbacksComponent implements OnInit {
  posts: any = [];

  constructor(private http: HttpClient) {}

  private feedbackService = inject(FeedbackService);
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.feedbackService.getPosts().subscribe({
      next:(posts:any) =>{
        this.posts = posts;
        console.log('Posts fetched successfully');

      },
      error: (error) => console.log('Error fetching posts',error)

    });
  }
}
