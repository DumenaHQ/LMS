import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  user: any;
  allOrdersFromLS: any;
  allOrderFromLS: any;
  key = 'pk_test_d586eb9d6d6ec62439571f56fea7c8330e4d4366';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get Order from localstorge
    this.allOrdersFromLS = this.orderService.getOrderFromLocalStorage();
    this.allOrdersFromLS.forEach((element: any) => {
      this.allOrderFromLS = element;
    });
  }

  // Add Order
  addOrder() {
    let payload = {
      items: new Array(),
    };

    // Map items from Localstorage to payload
    this.allOrdersFromLS.map((item: any) => {
      payload.items.push(item);
    });

    // Add order
    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res);
      // Send data to paystack
      this.payWithPaystack(res.data.order);

      // Remove cart item from localstorage
      localStorage.removeItem('cart');
    });
  }

  payWithPaystack(result: any) {
    // @ts-ignore
    let handler = PaystackPop.setup({
      key: this.key, // Replace with your public key
      email: 'chibuzo@gmail.com',
      amount: result.total_amount * 100,
      currency: 'NGN',
      ref: result.reference,
      callback: function (response: any) {
        var reference = response.reference;
        if (response.status === 'success') {
          fetch('https://api.dumena.com/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ reference }),
          })
            .then((res) => res.json())
            .then((data) => console.log({ data }));
        }
      },
      onClose: function () {
        alert('Transaction was not completed, window closed.');
      },
    });
    handler.openIframe();
  }
}
