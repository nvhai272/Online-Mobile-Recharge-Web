import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {
private readonly apiUrl: string = 'https://localhost:7201/api/Service';
private http = inject(HttpClient)
  constructor() { }
  getServiceMethods():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/list')
  }
  getService(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id,)
  }
  updateService(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createService(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }
  deleteService(id:number, inputdata:object){
    return this.http.put<any>(this.apiUrl + '/delete/' + id,inputdata)
  }
}