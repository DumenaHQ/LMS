import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.scss'],
})
export class ChildrenComponent implements OnInit {
  addLearnerModal: boolean = false;
  user: any;
  title: string = 'child';
  children: any;
  childData: any;
  selectPlanModal: boolean = false;
  dataLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent learners
    this.authService.getParentChildren(this.user.id).subscribe({
      next: (res: any) => {
        this.children = res.data.learners;
        console.log(this.children);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Open Add Child Modal
  openAddLearnerModal() {
    this.addLearnerModal = true;
  }

  // Close Add Child Modal
  closeAddLearnerModal() {
    this.addLearnerModal = false;
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
