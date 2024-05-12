// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7201/api/Authen';

  constructor(private http: HttpClient,private storageService : StorageService) {}

  login(phoneNumber: string, password: string): Observable<any> {
    return this.http.post(
      this.apiUrl + '/login',
      {
        phoneNumber,
        password,
        
      },
      httpOptions
    );
  }


  // setToken(token: string): void {
  //   this.storageService.setToken(token);
  // }

  getToken(): string | null {
    return this.storageService.getToken();
  }

  // isLoggedIn(): boolean {
  //   return !!this.getToken();
  // }

  logout(): void {
    this.storageService.removeToken();
  }

  // Method to attach token to headers of HTTP requests
 
}
