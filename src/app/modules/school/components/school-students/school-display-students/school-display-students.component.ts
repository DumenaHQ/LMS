import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  user: any;
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  students: any;
  studentName: any
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  selectedGrade: string = '';

  grades: any = [];

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
     // Get User data from localstorage
     let userData = this.authService.getUser();
     this.user = userData.user;
     this.getAllStudents();
  }

  // Get all students
  getAllStudents() {
    let grade = this.selectedGrade === '' ? undefined : this.selectedGrade;
    const school_id = this.user.id;
    this.schoolService.getSchoolLearners(school_id, grade).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
        if(this.grades.length === 0) {
          this.grades = res.data.grades.map((grade: any) => ({ 
            id: grade, name: grade 
          }));
        }
      },
      error: (e) => console.error(e),
    });
  }

  // Close Add Modal
  openAddLearnerModal() {
    this.addLearnerModal.emit();
  }

  // Filter students
  // filterStudents() {
  //   if (this.selectedGrade === '') {
  //     // Return all students if no grade is selected
  //     return this.students;
  //   }

  //   // Filter students by the selected grade
  //   const filteredStudents = this.students.filter((student: any) => student.grade === this.selectedGrade);

  //   this.students = filteredStudents;
  //   this.changeDectetorRef.detectChanges();
    
  //   // Sort filtered students by some criteria (e.g., by name)
  //   // return filteredStudents.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  // }

   // Open Confirm Delete Modal
   openDeleteModal(student: any) {

    console.log(student);
    this.studentName = student.username;
    
    this.deleteModal = true;

    this.deleteUrl = `schools/${this.user.id}/learners/${student.id}`;
    this.deleteRoutePath = '';
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }
}
