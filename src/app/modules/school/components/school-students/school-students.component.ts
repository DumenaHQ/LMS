import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss'],
})
export class SchoolStudentsComponent implements OnInit {
  addLearnerModal: boolean = false;
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
    this.getAllStudents();
  }

  // Get all students
  getAllStudents() {
    let grade = undefined;
    this.schoolService.getSchoolLearners(this.user.id, grade).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Open Learner Modal
  openAddLearnerModal() {
    this.addLearnerModal = true;
  }

  // Close Learner modal
  closeAddLearnerModal() {
    this.addLearnerModal = false;
  }
}
