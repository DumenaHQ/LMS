import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-school-payment',
  templateUrl: './school-payment.component.html',
  styleUrls: ['./school-payment.component.scss'],
})
export class SchoolPaymentComponent implements OnInit {
  user: any;
  // reference: any;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.orderService.getOrder().subscribe((res: any) => {
      console.log(res);
    });
  }

  addOrder() {
    let payload = {
      items: [
        {
          order_type: 'sub',
          slug: 'standard-plan',
          user_id: this.user,
        },
        {
          order_type: 'sub',
          slug: 'pro-plan',
          user_id: this.user,
        },
      ],
    };
    console.log(payload);

    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res);
      // this.reference = res.reference

      // this.verifyPayment(res.data.order.reference);
    });
  }

  verifyPayment(ref: any) {
    let payload = {
      reference: ref,
    };

    this.paymentService.verifyPayment(payload).subscribe((res: any) => {
      console.log(res);
    });
  }
}
