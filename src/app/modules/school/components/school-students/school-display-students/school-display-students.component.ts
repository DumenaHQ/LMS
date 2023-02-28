import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  user: any;
  @Input() students: any;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService
  ) {}

  ngOnInit(): void {
     // Get User data from localstorage
     let userData = this.authService.getUser();
     this.user = userData.user;
  }

  deleteStudent(student: any) {
    // Get school learners from localstorage
    this.schoolService.getSchoolLearners(this.user.id).subscribe({
      next: (res: any) => {
        this.students = res;
      },
      error: (e) => console.error(e),
    });
    
  }
}
