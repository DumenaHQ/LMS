import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-check',
  templateUrl: './verify-check.component.html',
  styleUrls: ['./verify-check.component.scss'],
})
export class VerifyCheckComponent implements OnInit {
  user: any;
  userType: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Prevent logged in users from routing to this page
    if (this.authService.isLoggedIn()) {
      // Get user role type
      let userData = this.authService.getUser();
      this.userType = userData.user.role;

      // Route user to his/her dashboard
      this.router.navigate(['/' + this.userType]);
    }
  }
}
