import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl: string = environment.baseUrl;
  paystackKey: string = environment.paystackKey;

  constructor(private http: HttpClient) {}

  // Get All Payments (for Admin)
  getPayments() {
    return this.http.get(
      this.baseUrl + 'users/:user_id/payments',
      this.getHttpOptions()
    );
  }

  // Get payments by user id
  getPaymentsByUserId(userId: any) {
    return this.http.get(
      `${this.baseUrl}users/${userId}/payments`,
      this.getHttpOptions()
    );
  }

  // Verify Payment
  verifyPayment(data: any) {
    console.log(data);
    return this.http.post(
      this.baseUrl + 'payments/verify',
      data,
      this.getHttpOptions()
    );
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return httpOptions;
  }
}
