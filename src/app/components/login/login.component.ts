import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = "";
  showError: boolean = false;
  userType: any;

  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {

    // Prevent logged in users from routing to this page
    if (this.authService.isLoggedIn()) {
      // Get user role type
      let userData = this.authService.getUser()
      this.userType = userData.user.role

      // Route user to his/her dashboard
      this.router.navigate(['/' + this.userType])
    }

  }



  // Log In
  logIn(data: any) {
    // Set loading to true
    this.loading = true

    // Send users data
    this.authService.login(data).subscribe((res: any) => {
      console.log(res)

      // Set token
      this.authService.addUserDataToLocalStorage(res.data?.user.token, res.data)

      // If status is true, set User Type
      if (res.status == true) {
        this.router.navigate(['/coming-soon'])
        // this.CheckUserType(res.data.user.role)
      }

    }, ((error: any) => {
      console.log(error)
      // Show error message
      this.errorMessage = error.error.message
      this.showError = true

      // Set loading to false
      this.loading = false

      // Set Timeout
      // setTimeout(() => {
      //   this.showError = false
      // }, 3000);


    }))
  }

  // Check User Role
  CheckUserType(userType: any) {
    switch (userType) {
      // If Admin
      case 'admin':
        // Navigate to Admin Dashboard
        this.router.navigate(['/admin'])
        break;
      // If Learner
      case 'learner':
        // Navigate to Learner Dashboard
        this.router.navigate(['/learner'])
        break;
      // If Parent
      case 'parent':
        // Navigate to Parent Dashboard
        this.router.navigate(['/parent'])
        break;
      // If School
      case 'school':
        // Navigate to School Dashboard
        this.router.navigate(['/school'])
        break;
    }
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }

}
