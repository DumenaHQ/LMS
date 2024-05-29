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
  confirmModal: boolean = false;
  confirmUrl: string;
  confirmMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentItem = this.activatedRoute.snapshot.params;
    this.user = this.authService.getUser().user;
    this.getParentLearner();
  }
  
  getParentLearner() {
    // Get parent child
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

  goToParentChildrenPage() {
    this.router.navigate(['/parent/children']);
  }

  openConfirmModal() {
    this.confirmModal = true;
    this.confirmMessage = `Are you sure you want to remove ${this.child.fullname}?`;
    this.confirmUrl = `parents/${this.user.id}/learners/${this.child.id}`;
  }

  // Close Confirm Delete Modal
  closeConfirmModal() {
    this.confirmModal = false;
  }

}
