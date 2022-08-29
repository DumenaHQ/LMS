import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.scss'],
})
export class EditChildComponent implements OnInit {
  isEdit: boolean = false;
  currentItem: any;
  child: any;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  // Child form
  childForm = this.formBuilder.group({
    fullname: ['', Validators.required],
  });

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
          this.childForm = this.formBuilder.group({
            fullname: [this.child.fullname, Validators.required],
          });
        }
      });
    });
  }
}
