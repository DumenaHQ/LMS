import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  allStudents = [
    {
      id: 1,
      image: '../../../../../../assets/img/children-avatar/child-avatar-1.png',
      name: 'Lovinda Jamestown',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Male',
      dateEnrolled: 'July 2nd, 2022',
    },
    {
      id: 2,
      image: '../../../../../../assets/img/children-avatar/child-avatar-2.png',
      name: 'David Khing',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Female',
      dateEnrolled: 'July 2nd, 2022',
    },
    {
      id: 3,
      image: '../../../../../../assets/img/children-avatar/child-avatar-3.png',
      name: 'Chris Evans',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Male',
      dateEnrolled: 'July 2nd, 2022',
    },
  ];
  user: any;
  students: any;
  dataLoading: boolean = true;
  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get parent kids from localstorage
    this.schoolService.getSchoolLearners(this.user.id).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
        console.log(this.students);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }
}
