import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertType, AppAlertService } from './app-alerts/app-alert.service';
import PaystackPop from '@paystack/inline-js';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private ngZOne: NgZone,
    private appAlertService: AppAlertService,
  ) {}

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
    return this.http.post(
      this.baseUrl + 'payments/verify',
      data,
      this.getHttpOptions()
    );
  }

  payWithPaystack(access_code: string) {
    let url = this.baseUrl;
    let zone = this.ngZOne;
    const popup = new PaystackPop();
    let handler = popup.resumeTransaction(access_code)({
      access_code: access_code,
      callback: function (response: any) {
        var reference = response.reference;
        if (response.status === 'success') {
          fetch(url + 'payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ reference }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log({ data });
              if (data.status == true) {
                zone.run(() => {
                  this.getClassrooms();
                  this.closeConfirmModal();
                });
              }
            });
        }
      },
      onClose: () => {
        this.appAlertService.showAlert('Transaction was not completed', AlertType.Error);
      },
    });
    handler.openIframe();
  }

  // Get HttpOptions
  getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + localStorage.getItem('token'),
      }),
      // mode: 'cors' // enables CORS mode
    };
    return httpOptions;
  }
}
