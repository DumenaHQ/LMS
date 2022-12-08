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

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
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

}
