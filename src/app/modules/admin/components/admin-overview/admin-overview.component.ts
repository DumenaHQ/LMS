import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolAnalyticsModel } from './models/school-analytics.model';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  schoolAnalytics?: SchoolAnalyticsModel[];
  allUsers: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get All Users
    // this.authService.allUser().subscribe((res: any) => {
    //   console.log(res);
    //   this.allUsers = res.data.users;
    //   this.allUsers.forEach((element: any) => {
    //     console.log(element);
    //   });
    // });

    this.fetchSchoolAnalytics();
  }

  fetchSchoolAnalytics() {
    this.authService.fetchSchoolAnalytics().subscribe((res: any) => {
      this.schoolAnalytics = res.data;
    });
  }
  
}
