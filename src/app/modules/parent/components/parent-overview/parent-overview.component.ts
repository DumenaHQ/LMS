import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-parent-overview',
  templateUrl: './parent-overview.component.html',
  styleUrls: ['./parent-overview.component.scss'],
})
export class ParentOverviewComponent implements OnInit {
  billingId: string = 'monthly';
  user: any;
  children: any;
  addModal: boolean = false;
  // showAlert: boolean = false;
  title: string = 'child';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.orderService.getOrder().subscribe((res: any) => {
      console.log(res);
    });

    // Get parent kids from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      this.children = res.data.learners;
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Open Add Child Modal
  openAddModal() {
    this.addModal = true;
  }

  // Close Add Child Modal
  closeAddModal() {
    this.addModal = false;
  }

  // Add to Cart
  addToCart(title: any, amount: any) {
    let payload = {
      slug: title,
      amount: amount,
      user_id: this.user.id,
      order_type: 'sub',
    };
    console.log(payload);

    this.orderService.addOrder(payload).subscribe((res: any) => {
      console.log(res);
      // this.reference = res.reference
    });
  }
}
