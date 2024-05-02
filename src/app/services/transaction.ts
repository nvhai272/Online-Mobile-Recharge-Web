import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction, Transactions } from '../../type';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:7201/api/Transaction';
@Injectable({
  providedIn: 'root',
})
export class transactionService{
  constructor(private http: HttpClient) { }

  getAll(): Observable<Transactions[]> {
    return this.http.get<any>(baseUrl + '/list');
  }

  get(id: any): Observable<Transaction> {
    return this.http.get<Transaction>(`${baseUrl}/detail/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
}