import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recharge_plan, Servicees } from "../../type";
import { Observable } from 'rxjs';
const baseUrl = 'https://localhost:7201/api/Service';

@Injectable({
  providedIn: 'root'
})
export class Service{
    constructor(private http: HttpClient) { }

    getAll(): Observable<Servicees[]> {
      return this.http.get<any>(baseUrl + '/list');
    }
  
    get(id: any): Observable<Servicees> {
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