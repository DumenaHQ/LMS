import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-overview',
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent implements OnInit {
  approvedSchools = [
    {
      id: 1,
      name: 'Raberto Secondary School',
      headOfSchool: 'Ronald Richards',
      phoneNumber: '(405) 555-0128',
      schoolEmail: 'sara.cruz@example.com',
      schoolStatus: 'approved',
    },
    {
      id: 2,
      name: 'Deo Gratias',
      headOfSchool: 'Savannah Nguyen',
      phoneNumber: '(704) 555-0127',
      schoolEmail: 'nathan.roberts@example.com',
      schoolStatus: 'decline',
    },
    {
      id: 3,
      name: 'Funtag College',
      headOfSchool: 'Leslie Alexander',
      phoneNumber: '(629) 555-0129',
      schoolEmail: 'deanna.curtis@example.com',
      schoolStatus: 'in review',
    },
    {
      id: 4,
      name: 'Premier College',
      headOfSchool: 'Esther Howard',
      phoneNumber: '(406) 555-0120',
      schoolEmail: 'michael.mitc@example.com',
      schoolStatus: 'approved',
    },
    {
      id: 5,
      name: 'Nigerian Turkish Int,',
      headOfSchool: 'Mr Ignatius Sola',
      phoneNumber: '+234805664567',
      schoolEmail: 'debbie.baker@example.com',
      schoolStatus: 'approved',
    },
  ];
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
  }
}
