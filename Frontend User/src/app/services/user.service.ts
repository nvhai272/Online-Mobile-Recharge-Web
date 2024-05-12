import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private readonly apiUrl: string = 'https://localhost:7201/api/User';
private http = inject(HttpClient)
  constructor() { }
  
  getUser(id : number):Observable<any>{
    return this.http.get<any>(this.apiUrl+'/detail/' + id)
  }
  updateUser(id:number,inputdata:object){
    return this.http.put<any>(this.apiUrl+ '/edit/' + id,inputdata)
  }
  createUser(inputdata:object){
    return this.http.post<any>(this.apiUrl + '/create/',inputdata,{responseType : 'json'})
  }

  changePassword(id:number, inputdata:object) {
    return this.http.put<any>(this.apiUrl + '/changePassword/' + id, inputdata)
  }
}
