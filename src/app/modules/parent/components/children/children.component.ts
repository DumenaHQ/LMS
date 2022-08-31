import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
})
export class ChildrenComponent implements OnInit {
  addModal: boolean = false;
  isAlert: boolean = false;
  user: any;
  title: string = 'child';
  children: any;
  childData: any;
  selectPlanModal: boolean = false;
  alertMessage: any;
  dataLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent kids from localstorage
    this.authService.getParentChildren(this.user.id).subscribe({
      next: (res: any) => {
        // console.log(`Server Response Result: ${res.responseMessage}`);
        this.children = res.data.learners;
        // this.customerRelationshipDesks.forEach((c: any) => {
        //   this.customerRelationshipDesk = c;
        // });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
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

  // Open Select Plan Modal
  openSelectPlanModal(childData: any) {
    this.selectPlanModal = true;

    this.childData = childData;
    // console.log(childData);
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
