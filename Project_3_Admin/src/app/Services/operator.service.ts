import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
private readonly apiUrl: string = 'https://localhost:7201/api/Operator';
private http = inject(HttpClient)
  constructor() { }
  getOperators():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/list')
  }
  getOperator(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id,)
  }
  updateOperator(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createOperator(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }
  deleteOperator(id:number, inputdata:object){
    return this.http.put<any>(this.apiUrl + '/delete/' + id,inputdata)
  }
}