import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recharge_plan } from "../../type";
import { Observable } from 'rxjs';
const baseUrl = 'https://localhost:7201/api/RechargePlan';

@Injectable({
  providedIn: 'root'
})
export class Recharge_planService{
    constructor(private http: HttpClient) { }

    getAll(): Observable<Recharge_plan[]> {
      return this.http.get<any>(baseUrl + '/list');
    }
  
    get(id: any): Observable<Recharge_plan> {
      return this.http.get<Recharge_plan>(`${baseUrl}/detail/${id}`);
    }
  
    create(data: any): Observable<any> {
      return this.http.post(baseUrl, data);
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