import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentMethod } from '../../type';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'https://localhost:7201/api/PaymentMethod';
@Injectable({
  providedIn: 'root',
})
export class paymentService{
  constructor(private http: HttpClient) { }

  getAll(): Observable<PaymentMethod[]> {
    return this.http.get<any>(baseUrl + '/list');
  }

  get(id: any): Observable<PaymentMethod> {
    return this.http.get<PaymentMethod>(`${baseUrl}/detail/${id}`);
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