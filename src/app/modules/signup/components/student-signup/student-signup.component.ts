import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {

  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = "";
  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true

    let payroll = {
      fullname: data.firstname + ' ' + data.lastname,
      username: data.firstname + '_' + data.lastname,
      email: data.email,
      user_type: "learner",
      password: data.password,
      phone: data.phone,
      resident_state: data.resident_state
    }

    // Send users data
    this.authService.addUser(payroll).subscribe((res: any) => {
      console.log(res)

      if (res.status == true) {
        // Store user data to localstorage
        this.authService.addUserDataToLocalStorage(res.data)
        // Navigate to Dashboard
        this.router.navigate(['/verify-email'])
      }

      // Show error message
      this.errorMessage = res.message
      this.showError = true

      // Set loading to false
      this.loading = false

    }, ((error: any) => {
      console.log(error)
      // Show error message
      // Show error message
      error.error.error.code == 400 ? this.errorMessage = error.error.error.errors[0].message : this.errorMessage = error.error.message
      this.showError = true

      // Set loading to false
      this.loading = false

      // Set Timeout
      // setTimeout(() => {
      //   this.showError = false
      // }, 3000);


    }))
  }



  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }

}
