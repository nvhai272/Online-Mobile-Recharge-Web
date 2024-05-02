import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginationParams, Transactions } from '../../types';


// const BASE_URL = 'https://localhost:7201/api/Transaction/list';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient)
  
  constructor() { }

  getTransactions = (url: string, params: PaginationParams): Observable<any> => {
    return this.http.get(url, {
      params,
      responseType: 'json',
    });
  }

  getTodayMoney(){
    return this.http.get('https://localhost:7201/api/Transaction/totalAmountForToday');
  }

  getTodayUser(){
    return this.http.get('https://localhost:7201/api/Transaction/countUniqueTransactionUsersForToday');
  }

  getTodayClient(){
    return this.http.get('https://localhost:7201/api/User/countNewUsersForToday');
  }

  getTodaySale(){
    return this.http.get('https://localhost:7201/api/Transaction/totalTransactionAmount');
  }

  getUserTransaction(id:number):Observable<any>{
    return this.http.get<any>('https://localhost:7201/api/Transaction/transactionOfUser/' + id)
  }
}