import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  isEdit: boolean = false;
  user: any;
  fullname: string = '';
  @Output() isAlert: boolean = false;
  alertMessage: string;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  // User Form
  userForm = this.formBuilder.group({
    fullname: ['', Validators.required],
    // firstname: ['', Validators.required],
    // lastname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get firstname and lastname from user fullname
    let fullnameArray = this.user.fullname;
    this.fullname = fullnameArray.split(' ');

    this.userForm = this.formBuilder.group({
      fullname: [this.user.fullname, Validators.required],
      // firstname: [this.fullname[0], Validators.required],
      // lastname: [this.fullname[1], Validators.required],
      email: [this.user.email, Validators.required],
      phone: [this.user.phone, Validators.required],
    });
  }

  // Edit user profile
  editProfile() {
    // Start loading
    this.loading = true;

    let payload = {
      fullname: this.userForm.value.fullname,
      phone: this.userForm.value.phone,
      resident_state: '',
    };

    this.authService.updateUser(payload).subscribe((res: any) => {
      console.log(res);

      if (res.status == true) {
        // Set User data
        this.authService.addUserDataToLocalStorage(res.data);

        this.showAlert();
      }
    });
  }

  // Show alert
  showAlert() {
    // Set message
    this.alertMessage = 'Your profile has been updated successfully!';

    // Show Alert
    this.isAlert = true;

    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
      window.location.reload();
    }, 2000);
  }
}
