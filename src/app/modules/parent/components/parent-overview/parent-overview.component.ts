import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-parent-overview',
  templateUrl: './parent-overview.component.html',
  styleUrls: ['./parent-overview.component.scss'],
})
export class ParentOverviewComponent implements OnInit {
  pricingPlanForm: any = FormGroup;

  user: any;
  children: any;
  childData: any;
  addModal: boolean = false;
  title: string = 'child';
  selectPlanModal: boolean = false;

  // Payment History
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

    // Get parent kids from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      const result = res.data.learners;
      // Display only two(2) children
      const size = 2;
      this.children = result
        .sort(() => Math.random() - Math.random())
        .slice(0, size);
    });
  }

  // Open Add Child Modal
  openAddModal() {
    this.addModal = true;
  }

  // Close Add Child Modal
  closeAddModal() {
    this.addModal = false;
  }

  // Open Select Plan Modal
  openSelectPlanModal(childData: any) {
    this.selectPlanModal = true;

    this.childData = childData;
  }

  // Close Select Plan Modal
  closeSelectPlanModal() {
    this.selectPlanModal = false;
  }
}
