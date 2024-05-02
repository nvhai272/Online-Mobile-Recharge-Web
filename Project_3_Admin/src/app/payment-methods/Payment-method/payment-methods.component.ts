import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { HeaderComponent } from '../../common/header/header.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PaymentMethodService } from '../../Services/payment-method.service';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [HttpClientModule, NavbarComponent, HeaderComponent,FooterComponent, RouterLink, RouterOutlet,CommonModule],
  templateUrl: './payment-methods.component.html',
  styleUrl: './payment-methods.component.css'
})
export class PaymentMethodsComponent implements OnInit {
  posts: any = [];

  constructor(private http: HttpClient) {}

  private paymenMethodService = inject(PaymentMethodService);
  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(){
    this.paymenMethodService.getPaymentMethods().subscribe({
      next:(posts:any) =>{
        this.posts = posts;
        console.log('Posts fetched successfully');

      },
      error: (error) => console.log('Error fetching posts',error)

    });
  }
}
