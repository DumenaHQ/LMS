import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
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

  // Open Confirm Delete Modal
  openDeleteModal() {
    this.deleteModal = true;

    this.deleteUrl = `parents/${this.user.id}/learners/${this.child.id}`
    this.deleteRoutePath = '/parent/children'
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

}
