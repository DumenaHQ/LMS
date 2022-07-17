import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  user: any;
  // reference: any;

  constructor(private orderService: OrderService, private authService: AuthService, private paymentService: PaymentService) { }

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user

    this.orderService.getOrder().subscribe((res: any) => {
      console.log(res)
    })

    this.addOrder()



  }

  addOrder() {
    let payload = {
      "user_id": this.user.id,
      "order_type": "sub",
      "order_type_id": "62bddccbd9c9f2c740e3e4a1",
      "slug": "standard-plan"
    }

    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res)
      // this.reference = res.reference

      this.verifyPayment(res.data.order.reference)
    })
  }

  verifyPayment(ref: any) {
    let payload = {
      "reference": ref
    }

    this.paymentService.verifyPayment(payload).subscribe((res: any) => {
      console.log(res)
    })
  }



  // payWithPaystack(e: any) {
  //   e.preventDefault();
  //   let handler = PaystackPop.setup({
  //     key: 'pk_test_xxxxxxxxxx', // Replace with your public key
  //     email: 'email',
  //     amount: 0 * 100,
  //     ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
  //     // label: "Optional string that replaces customer email"
  //   });
  //   this.onClose()
  //   this.callback('res')
  //   handler.openIframe();
  // }
  // onClose() {
  //   alert('Window closed.');
  // }
  // callback(response: any) {
  //   let message = 'Payment complete! Reference: ' + response.reference;
  //   alert(message);
  // }



}
