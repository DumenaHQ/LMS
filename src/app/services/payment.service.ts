import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl: string = environment.baseUrl

  constructor(private http: HttpClient) { }

  // Get Order (for Admin)
  getPayments() {
    return this.http.get(this.baseUrl + 'payments', this.getHttpOptions())
  }

  // Add Order
  verifyPayment(data: any) {
    return this.http.post(this.baseUrl + 'payments/verify', data, this.getHttpOptions())
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
