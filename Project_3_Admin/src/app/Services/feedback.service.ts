import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';


const BASE_URL ='https://localhost:7201/api/Feedback/list';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
private http = inject(HttpClient)
  constructor() { }
  getPosts(){
    return this.http.get(BASE_URL);
  }
}