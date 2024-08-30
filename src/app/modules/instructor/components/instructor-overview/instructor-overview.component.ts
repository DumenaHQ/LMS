import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
declare var google: any;

@Component({
  selector: 'app-instructor-overview',
  templateUrl: './instructor-overview.component.html',
  styleUrls: ['./instructor-overview.component.scss']
})
export class InstructorOverviewComponent implements OnInit {

  user: any;
  isOnboarding: boolean = true;
  public greeting: string = '';
  learnersActivities: any;


  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
  ) {}

  ngOnInit(): void {

    // Get greeting
    this.greeting = this.authService.getGreeting() 
    
    // Get user data from localstorage
    this.user = this.authService.getUser().user;
    this.getUsersActivities();
  }

  getUsersActivities() {
    this.schoolService.getUserActivities().subscribe({
      next: (res: any) => {
        this.learnersActivities = res.data;
        console.log(res);        
      },
      error: (e) => console.error(e),
    });
  }


}

