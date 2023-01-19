import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  addLearnerModal: boolean = false;
  title: string = 'child';
  selectPlanModal: boolean = false;
  isAlert: boolean = false;
  elem: any;
  stepValue = 40;

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
  alertMessage: string = '';
  isOnboarding: boolean = true;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent children from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      const result = res.data.learners;
      // Display only two(2) children
      const size = 2;
      this.children = result
        .sort(() => Math.random() - Math.random())
        .slice(0, size);
    });

    // Progress bar
    this.progressBar();
  }

  // Progress Bar
  progressBar() {
    this.elem = document.getElementById('bar');

    this.elem.style.width = this.stepValue + '%';
    // this.elem.innerHTML = this.stepValue + '%' + ' complete';
    this.stepValue = this.stepValue + 10;
  }

  // Open Add Child Modal
  openAddLearnerModal() {
    this.addLearnerModal = true;
  }

  // Close Add Child Modal
  closeAddLearnerModal() {
    this.addLearnerModal = false;
  }

  // close Onboarding modal
  closeOnboardModal() {

    let payload = {
      isUserOnboarded: true,
    }
    

    // update user profile
    this.authService.updateUser(payload).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        // Set User data
        this.authService.addUserDataToLocalStorage(res.data);
        this.ngOnInit()
      }
    });
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

  // Manage child
  manageChild(userId: any) {
    this.router.navigate([`/parent/children/${userId}`]);
  }
}
