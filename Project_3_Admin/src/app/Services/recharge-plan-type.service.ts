import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargePlanTypeService {
private readonly apiUrl: string = 'https://localhost:7201/api/RechargePlanType';
private http = inject(HttpClient)
  constructor() { }
  getRechargePlanTypes():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/list')
  }
  getRechargePlanType(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id)
  }
  updateRechargePlanType(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createRechargePlanType(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }
  deleteRechargePlanType(id:number, inputData:object){
    return this.http.put<any>(this.apiUrl + '/delete/' + id, inputData)
  }
}