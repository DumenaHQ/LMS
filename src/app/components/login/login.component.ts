import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormErrorMessageService } from 'src/app/services/utils/form-error-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  errorMessage: string = '';
  userType: any;
  formGroup: any = FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private appAlertService: AppAlertService,
    private formErrorService: FormErrorMessageService
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
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Log In
  login() {
    this.loading = true;

    this.authService.login(this.formGroup.value).subscribe(
      (res: any) => {
        if (res.status == true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
          this.authService.setToken(res.data?.user.token);
          this.authService.addUserDataToLocalStorage(res.data);
          this.CheckUserType(res.data.user.role);
        }
      },
      (error: any) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.appAlertService.showAlert(
          error.error.message
            ? error.error.message
            : error.message
            ? error.error.message || error.error.error.errors[0].message
            : error.message,
          AlertType.Error
        );
        this.loading = false;
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
      // If Instructor
      case 'instructor':
        // Navigate to School Dashboard
        this.router.navigate(['/instructor']);
        break;
    }
  }

  getErrorMessage(controlName: string, labelName: string): string {
    const control = this.formGroup.get(controlName);
    const errors = control?.errors;
    return this.formErrorService.getErrorMessage(errors, labelName);
  }

  // Resend verification email
  reVerifyEmail() {
    this.authService
      .resendVerificationEmail(this.formGroup.value.email)
      .subscribe((res: any) => {
        if (res.status === true) {
          this.appAlertService.showAlert(res.message, AlertType.Success);
        }
      });
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
