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
  showAlert: boolean = false;
  user: any;
  title: string = 'child';
  children: any;
  childData: any;
  selectPlanModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent kids from localstorage
    this.authService.getParentChildren(this.user.id).subscribe((res: any) => {
      this.children = res.data.learners;
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

  // Show ALert Popup
  showAlertPopup() {
    this.showAlert = true;
    // Hide after some seconds
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
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
