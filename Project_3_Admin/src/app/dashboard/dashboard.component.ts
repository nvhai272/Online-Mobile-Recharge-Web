import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { NavbarComponent } from '../common/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { TransactionService } from '../Services/transaction.service';
import { Transaction, Transactions } from '../../types';
import { Paginator, PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, HeaderComponent, FooterComponent, RouterLink, RouterOutlet, CommonModule, PaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  transaction: Transaction[] = [];

  totalRecords: number = 0;
  rows: number = 5;

  todayMoney: string;
  todayUser: number;
  todayClient: number;
  todaySale: string;

  constructor(private transService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions(0, this.rows);
    this.loadClient();
    this.loadMoney();
    this.loadSale();
    this.loadUser();
  }

  onPageChange(event: any) {
    this.loadTransactions(event.page, event.rows);
  }

  loadTransactions(page: number, perPage: number) {
    this.transService.getTransactions('https://localhost:7201/api/Transaction/list', { page, perPage })
      .subscribe({next: (data: Transactions) => {
        this.transaction = data.items;
        this.totalRecords = data.total;
        console.log(data.items);
      },
        error: (err) => {
          console.log(err);
        },
      });
  }

  loadUser() {
    this.transService.getTodayUser().subscribe({
      next: (user: any) => {
        this.todayUser = user;
      }
    })
  }

  loadClient() {
    this.transService.getTodayClient().subscribe({
      next: (client: any) => {
        this.todayClient = client;
      }
    })
  }

  loadSale() {
    this.transService.getTodaySale().subscribe({
      next: (sale: any) => {
        this.todaySale = sale;
      }
    })
  }

  loadMoney() {
    this.transService.getTodayMoney().subscribe({
      next: (money: any) => {
        this.todayMoney = money;
      }
    })
  }
}
