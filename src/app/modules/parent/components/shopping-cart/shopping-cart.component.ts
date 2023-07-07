import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  baseUrl: string = environment.baseUrl;
  key = environment.paystackKey;
  user: any;
  orders: any;
  order: any;
  grandTotal: number = 0;
  value: any;
  isVoucher: boolean = false;
  loading: boolean = false;
  plans: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private ngZOne: NgZone
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get cart products from local storage
    this.plans = this.orderService.loadCart()
    this.getGrandTotal()
  }

  // Find Sum
  getGrandTotal() {
    // this.value = data;
    this.grandTotal = this.plans.reduce((sum: any, product: any) => sum += product.amount, 0)
    
    return this.grandTotal
  }

  // Add Order
  addOrder() {
    // Start loading
    this.loading = true;

    let payload = {
      items: this.plans,
    };

    // Add order
    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res);

      // Send data to paystack
      this.payWithPaystack(res.data.order);

      // Remove cart item from localstorage
      localStorage.removeItem('cart_item');
    });
  }

  // Pay with Paystack
  payWithPaystack(result: any) {
    let url = this.baseUrl;
    let router = this.router;
    let userRole = this.user.role;
    let zone = this.ngZOne;
    // @ts-ignore
    let handler = PaystackPop.setup({
      key: this.key,
      email: this.user.email,
      amount: result.total_amount * 100,
      currency: 'NGN',
      ref: result.reference,
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
              // if payment is successful, route user to children page
              if (data.status == true) {
                zone.run(() => {
                  router.navigate([userRole + '/children']);
                });
              }
            });
        }
      },
      onClose: function () {
        alert('Transaction was not completed!');
      },
    });
    handler.openIframe();
  }

  // Remove item from localstorage
  removeItemFromLocalStorage(plan: any): void {
    this.orderService.removePlan(plan)
    this.getGrandTotal()
    // Show alert
    this.showAlert('Item removed from cart', 'success')
  }

  // Show alert
  showAlert(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
