import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  createSchoolSubcription(data: any) {
    return this.http.post(
      `${this.baseUrl}subscriptions/class-sub`,
      data,
      this.getHttpOptions('application/json') 
    );
  }

  // Get HttpOptions
  getHttpOptions(contentType: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
