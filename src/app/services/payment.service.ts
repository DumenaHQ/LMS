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

  // Get Order (for Admin)
  getPayments() {
    return this.http.get(this.baseUrl + 'payments', this.getHttpOptions());
  }

  // Add Order
  verifyPayment(data: any) {
    console.log(data);
    return this.http.post(
      this.baseUrl + 'payments/verify',
      data,
      this.getHttpOptions()
    );
  }

  // payWithPaystack(result: any) {
  //   // @ts-ignore
  //   let handler = PaystackPop.setup({
  //     key: this.key, // Replace with your public key
  //     email: 'chibuzo@gmail.com',
  //     amount: result.total_amount * 100,
  //     currency: 'NGN',
  //     ref: result.reference,
  //     callback: function (response: any) {
  //       var reference = response.reference;
  //       if (response.status === 'success') {
  //         fetch('https://api.dumena.com/payments/verify', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             Authorization: `bearer ${localStorage.getItem('token')}`,
  //           },
  //           body: JSON.stringify({ reference }),
  //         })
  //           .then((res) => res.json())
  //           .then((data) => console.log({ data }));
  //       }
  //     },
  //     onClose: function () {
  //       alert('Transaction was not completed, window closed.');
  //     },
  //   });
  //   handler.openIframe();
  // }

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
