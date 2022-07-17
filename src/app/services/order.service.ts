import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }


  // Get Order
  getOrder() {
    return this.http.get(this.baseUrl + 'orders', this.getHttpOptions())
  }

  // Add Order
  addOrder(data: any) {
    return this.http.post(this.baseUrl + 'orders', data, this.getHttpOptions())
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    return httpOptions
  }

}
