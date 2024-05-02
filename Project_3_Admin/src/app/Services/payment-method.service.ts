import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
private readonly apiUrl: string = 'https://localhost:7201/api/PaymentMethod';
private http = inject(HttpClient)
  constructor() { }
  getPaymentMethods():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/list')
  }
  getPaymentMethod(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id,)
  }
  updatePaymentMethod(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createPaymentMethod(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }
  deletePaymentMethod(id:number, inputdata:object){
    return this.http.put<any>(this.apiUrl + '/delete/' + id,inputdata)
  }
}