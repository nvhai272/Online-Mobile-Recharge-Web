import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RechargePlanService {
private readonly apiUrl: string = 'https://localhost:7201/api/RechargePlan';
private http = inject(HttpClient)
  constructor() { }
  getRechargePlans():Observable<any>{
    return this.http.get<any>(this.apiUrl+'/list')
  }
  getRechargePlan(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id)
  }
  updateRechargePlan(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createRechargePlan(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }
  deleteRechargePlan(id:number, inputData:object){
    return this.http.put<any>(this.apiUrl + '/delete/' + id, inputData)
  }
}