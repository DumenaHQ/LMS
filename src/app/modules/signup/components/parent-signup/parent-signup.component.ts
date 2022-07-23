import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-parent-signup',
  templateUrl: './parent-signup.component.html',
  styleUrls: ['./parent-signup.component.scss'],
})
export class ParentSignupComponent implements OnInit {
  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true;

    let payroll = {
      fullname: data.fullname,
      email: data.email,
      user_type: 'parent',
      password: data.password,
      phone: data.phone,
      resident_state: data.resident_state,
    };

    // Send users data
    this.authService.addUser(payroll).subscribe(
      (res: any) => {
        console.log(res);

        // Store user data to localstorage
        this.authService.addUserDataToLocalStorage(res.data);

        if (res.status == true) {
          // Navigate to Dashboard
          this.router.navigate(['/verify-email']);
        }

        // Show error message
        this.errorMessage = res.message;
        this.showError = true;

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        error.error.error.code == 400
          ? (this.errorMessage = error.error.error.errors[0].message)
          : (this.errorMessage = error.error.message);
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

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }
}
