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
}
