import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-educator-signup',
  templateUrl: './educator-signup.component.html',
  styleUrls: ['./educator-signup.component.scss']
})
export class EducatorSignupComponent implements OnInit {

  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = "";
  showError: boolean = false;

  projects: any

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true

    let payroll = {
      fullname: data.full_name,
      email: data.email,
      user_type: "school",
      password: data.password,
      phone: data.phone,
      resident_state: data.resident_state,
      school: data.school,
      address: data.address
    }

    // Send users data
    // this.authService.addUser(payroll).subscribe((res: any) => {
    //   console.log(res)
    // Store user data to localstorage
    // this.authService.addUserDataToLocalStorage(res.data?.token, res.data)

    // if (res.status == true) {
    //   // Navigate to Dashboard
    //   this.router.navigate(['verify-email'])
    // }

    //   // Show error message
    //   this.errorMessage = res.message
    //   this.showError = true

    //   // Set loading to false
    //   this.loading = false

    // }, ((error: any) => {
    //   console.log(error)
    //   // Show error message
    //   this.errorMessage = error.error.message
    //   this.showError = true
    //   // Set loading to false
    //   this.loading = false

    //   // Set Timeout
    //   // setTimeout(() => {
    //   //   this.showError = false
    //   // }, 3000);


    // }))
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }

}
