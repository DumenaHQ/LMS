import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  user: any;
  // reference: any;
  billingId: string = 'monthly';
  isHidden: boolean = true;
  subPlan = [
    {
      id: 1,
      plan: 'standard',
      amountPerMonth: 'N15,000',
      amountPerYear: 'N180,000',
      benefits: [
        {
          name: '3 Months Subscription',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
        {
          name: 'Limited Access to courses',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
        {
          name: 'View Learning Activity',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
        {
          name: 'Project Tracking',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
      ],
      isHidden: true,
    },
    {
      id: 2,
      plan: 'pro',
      amountPerMonth: 'N9,000',
      amountPerYear: 'N108,000',
      benefits: [
        {
          name: '1 year Subscription',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
        {
          name: 'Everything in Standard',
          icon: '../../../assets/img/svg/check-prim.svg',
        },
        {
          name: 'DIY Projects',
          icon: '../../../assets/img/svg/plus-prim.svg',
        },
        {
          name: 'Live Tutoring Classes',
          icon: '../../../assets/img/svg/plus-prim.svg',
        },
        {
          name: 'Certificate',
          icon: '../../../assets/img/svg/plus-prim.svg',
        },
        {
          name: 'Full Access to Courses',
          icon: '../../../assets/img/svg/plus-prim.svg',
        },
      ],
      isHidden: true,
    },
  ];

  paymentsHistory = [
    {
      id: 1,
      childName: 'Alousa Jones',
      Product: 'Standard Plan',
      date: '05 June 2022',
      amount: '180,990',
      status: 'complete',
    },
    {
      id: 2,
      childName: 'Alousa Jones',
      Product: 'Standard Plan',
      date: '05 June 2022',
      amount: '180,990',
      status: 'declined',
    },
    {
      id: 3,
      childName: 'Alousa Jones',
      Product: 'Standard Plan',
      date: '05 June 2022',
      amount: '180,990',
      status: 'pending',
    },
  ];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // this.orderService.getOrder().subscribe((res: any) => {
    //   console.log(res);
    // });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }
}
