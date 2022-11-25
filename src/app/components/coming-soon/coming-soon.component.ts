import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss'],
})
export class ComingSoonComponent implements OnInit {
  days: number = 0;
  hours: number = 0;
  mins: number = 0;
  secs: number = 0;
  userType: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get user role type
    let userData = this.authService.getUser();
    this.userType = userData.user.role;

    this.x;
  }

  // Set Interval for Countdown at 1sec
  x = setInterval(() => {
    let eventDate = '2023-11-12T20:17:46.384Z';
    var futureDate = new Date(eventDate).getTime(); // Sat Jul 02 2022 11:00:00 GMT+0100 (West Africa Standard Time) (Launch Date)
    var currentDate = new Date().getTime();
    var timeLeft = futureDate - currentDate;

    this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    this.hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    this.mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Clear Interval
    if (timeLeft < 0) {
      clearInterval(this.x);

      // Route all users to their Dashboard
      this.CheckUserType();
    }
  }, 1000);

  // Check User Role
  CheckUserType() {
    switch (this.userType) {
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
}
