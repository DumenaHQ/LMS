import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';
import { SchoolDisplayStudentsComponent } from './school-display-students/school-display-students.component';

@Component({
  selector: 'app-school-students',
  templateUrl: './school-students.component.html',
  styleUrls: ['./school-students.component.scss'],
})
export class SchoolStudentsComponent implements OnInit {

  @ViewChild(SchoolDisplayStudentsComponent) schoolDisplayStudentsComponent!: SchoolDisplayStudentsComponent;
  addLearnerModal: boolean = false;
  user: any;
  dataLoading: boolean;
  students: any;
  grades: any = [];
  filterValues = {
    search: '',
    grade: '',
  };

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
    this.dataLoading = true;
    // let grade = this.filterValues.grade === '' ? undefined : this.filterValues.grade;
    const school_id = this.user.id;
    const params = {
      grade: this.filterValues.grade || undefined,
      search: this.filterValues.search || undefined
    };
    this.schoolService.getSchoolLearners(school_id, params).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
        if(this.grades.length === 0) {
          this.grades = res.data.grades.map((grade: any) => ({ 
            id: grade, name: grade 
          }));
        }
        this.dataLoading = false;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  handleFilterValues() {
    this.getAllStudents();   
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
