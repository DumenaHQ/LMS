import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
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
  reference: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private ngZOne: NgZone,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get cart products from local storage
    // this.plans = this.orderService.loadCart()
    this.getOrders();
  }

  // Get orders
  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        console.log(res);
        this.plans = res.data.orders;
        this.reference = res.data.orders[0].reference;
        this.getGrandTotal(res.data.orders);
        
      },
      error: (e) => console.error(e),
    });
  }

  // Find Sum
  getGrandTotal(plan: any) {
    // this.value = data;
    this.grandTotal = this.plans.reduce((sum: any, product: any) => sum += product.total_amount, 0)
    
    return this.grandTotal;
  }

  // Add Order
  // addOrder() {
  //   // Start loading
  //   this.loading = true;

  //   let payload = {
  //     items: this.plans,
  //   };

  //   // Add order
  //   this.orderService.addOrder(payload).subscribe((res: any) => {
  //     console.log(res);

  //     // Send data to paystack
  //     this.payWithPaystack(res.data.order);

  //     // Remove cart item from localstorage
  //     localStorage.removeItem('cart_item');
  //   });
  // }

  // Pay with Paystack
  payWithPaystack() {
    let url = this.baseUrl;
    let router = this.router;
    let userRole = this.user.role;
    let zone = this.ngZOne;
    // let reference = this.reference;
    // let amount = this.grandTotal;
    // @ts-ignore
    let handler = PaystackPop.setup({
      key: this.key,
      email: this.user.email,
      amount: this.grandTotal * 100,
      currency: 'NGN',
      ref: this.reference,
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
                  // router.navigate([userRole + '/children']);
                  this.getOrders();
                });
              }
            });
        }
      },
      onClose: () => {
        this.showAlert('Transaction was not completed', 'error');
        this.changeDectetorRef.detectChanges();
      },
    });
    handler.openIframe();
  }

  // Remove item from localstorage
  removeItemFromLocalStorage(plan: any): void {
    this.orderService.removePlan(plan)
    // this.getGrandTotal()
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
