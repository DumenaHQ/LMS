import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-pricing-plan',
  templateUrl: './pricing-plan.component.html',
  styleUrls: ['./pricing-plan.component.scss'],
})
export class PricingPlanComponent implements OnInit {
  @Output() selectPlanModal: EventEmitter<any> = new EventEmitter();
  // @Input() selectPlanModal: boolean = false;
  @Input() childData: any;
  pricingPlanForm: any = FormGroup;

  billingId: string = 'monthly';
  value: string = '';
  user: any;
  children: any;

  // Subscription Plan
  subPlan = [
    {
      id: 1,
      plan: 'standard-plan',
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
    },
    {
      id: 2,
      plan: 'pro-plan',
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
    },
  ];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // this.orderService.getOrder().subscribe((res: any) => {
    //   console.log(res);
    // });

    // Get parent kids from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      this.children = res.data.learners;
    });

    // Pricing plan Form
    this.pricingPlanForm = this.formBuilder.group({
      plan: ['', Validators.required],
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Get Selected plan
  getSelectedPlan() {
    // Set amount base on the plan selected
    var amount = 0;
    this.pricingPlanForm.value.plan == 'standard-plan'
      ? (amount = 15000)
      : (amount = 9000);

    // Set payload
    let payload = {
      name: this.childData.fullname,
      user_id: this.childData.id,
      slug: this.pricingPlanForm.value.plan,
      order_type: 'sub',
      billing_id: this.billingId,
      amount: this.billingId == 'monthly' ? amount : amount * 12, // If billing is monthly send original value other calculate for yearly (amount * 12)
    };

    // console.log(payload);
    this.orderService.addOrderToLocalStorage(payload);

    this.closeSelectPlanModal();
  }

  // Close Select plan Modal
  closeSelectPlanModal() {
    this.selectPlanModal.emit();
  }
}
