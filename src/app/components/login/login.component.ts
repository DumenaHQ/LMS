import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  userType: any;
  userForm: any = FormGroup;
  alertMessage: string = '';
  isAlert: boolean = false;
  isFormSubmitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Prevent logged in users from routing to this page
    // if (this.authService.isLoggedIn()) {
    //   // Get user role type
    //   let userData = this.authService.getUser();
    //   this.userType = userData.user.role;

    //   // Route user to his/her dashboard
    //   this.router.navigate(['/' + this.userType]);
    // }

    // User form
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Log In
  login() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    // Send users data
    this.authService.login(this.userForm.value).subscribe(
      (res: any) => {
        console.log(res);

        // If status is true, set User Type
        if (res.status == true) {
          // Set token
          this.authService.setToken(res.data?.user.token);

          // Set User data
          this.authService.addUserDataToLocalStorage(res.data);

          // Route user
          // this.router.navigate(['/coming-soon'])
          this.CheckUserType(res.data.user.role);
        }
      },
      (error: any) => {
        console.log(error);
        // Show error message
        this.errorMessage = error.error.message;

        this.showError = true;

        // Set loading to false
        this.loading = false;

        // Set Timeout
        // setTimeout(() => {
        //   this.showError = false
        // }, 3000);
      }
    );
  }

  // Check User Role
  CheckUserType(userType: any) {
    switch (userType) {
      // If Admin
      case 'admin':
        // Navigate to Admin Dashboard
        this.router.navigate(['/admin']);
        break;
      // If Learner
      case 'learner':
        // Navigate to Learner Dashboard
        this.router.navigate(['/learner']);
        break;
      // If Parent
      case 'parent':
        // Navigate to Parent Dashboard
        this.router.navigate(['/parent']);
        break;
      // If School
      case 'school':
        // Navigate to School Dashboard
        this.router.navigate(['/school']);
        break;
    }
  }

  // Resend verification email
  reVerifyEmail() {
    let payload = {
      email: this.userForm?.value?.email,
    };
    // david.aremu@st.fut.minna.edu.ng
    this.authService
      .resendVerificationEmail(this.userForm.value.email)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlert();
        }
      });
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

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
