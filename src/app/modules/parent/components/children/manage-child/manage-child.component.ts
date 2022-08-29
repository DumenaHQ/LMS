import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-child',
  templateUrl: './manage-child.component.html',
  styleUrls: ['./manage-child.component.scss'],
})
export class ManageChildComponent implements OnInit {
  currentItem: any;
  child: any;
  user: any;
  selectPlanModal: boolean = false;
  isAlert: boolean = false;
  alertMessage: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the current Item from the url
    this.currentItem = this.activatedRoute.snapshot.params;

    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent child from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      const result = res.data.learners;
      result.forEach((element: any) => {
        if (element.id === this.currentItem.childId) {
          this.child = element;
        }
      });
    });
  }

  // Open Select Plan Modal
  openSelectPlanModal() {
    this.selectPlanModal = true;
  }

  // Close Select Plan Modal
  closeSelectPlanModal() {
    this.selectPlanModal = false;
  }

  // Show alert
  showAlert() {
    // Show Alert
    this.isAlert = true;

    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 2000);
  }

  // Set alert message
  setAlertMessage(message: any) {
    this.alertMessage = message;
  }
}
