import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-overview',
  templateUrl: './school-overview.component.html',
  styleUrls: ['./school-overview.component.scss']
})
export class SchoolOverviewComponent implements OnInit {
  user: any;
  dataLoading: boolean = true;
  students: any;
  public greeting: string = ''

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {

    // Get greeting
    this.greeting = this.authService.getGreeting() 

    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get school learners from localstorage
    this.schoolService.getSchoolLearners(this.user.id).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
      },
      error: (e) => console.error(e),
    });
  }

  // close Onboarding modal
  closeOnboardModal() {

    let payload = {
      isUserOnboarded: true,
    }
    
    // update user profile
    this.authService.updateUser(payload).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        // Set User data
        this.authService.addUserDataToLocalStorage(res.data);
        this.ngOnInit()
      }
    });
  }

}
