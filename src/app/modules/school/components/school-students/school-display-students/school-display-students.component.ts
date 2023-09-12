import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  user: any;
  @Input() students: any;
  @Output() addLearnerModal: EventEmitter<any> = new EventEmitter();
  studentName: any

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  selectedGrade: string = '';

  grades: any = [
    { id: 1, name: 'Grade 1' },
    { id: 2, name: 'Grade 2' },
    { id: 3, name: 'Grade 3' },
    { id: 4, name: 'Grade 4' },
    { id: 5, name: 'Grade 5' },
    { id: 6, name: 'Grade 6' },
    { id: 7, name: 'Grade 7' },
    { id: 8, name: 'Grade 8' },
    { id: 9, name: 'Grade 9' },
    { id: 10, name: 'Grade 10' },
    { id: 11, name: 'Grade 11' },
    { id: 12, name: 'Grade 12' },
  ]

  constructor(
    private authService: AuthService,
    private changeDectetorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
     // Get User data from localstorage
     let userData = this.authService.getUser();
     this.user = userData.user;
  }

  // Close Add Modal
  openAddLearnerModal() {
    this.addLearnerModal.emit();
  }

  // Filter students
  filterStudents() {
    if (this.selectedGrade === '') {
      // Return all students if no grade is selected
      return this.students;
    }

    // Filter students by the selected grade
    const filteredStudents = this.students.filter((student: any) => student.grade === this.selectedGrade);

    this.students = filteredStudents;
    console.log(this.students);
    this.changeDectetorRef.detectChanges();
    
    // Sort filtered students by some criteria (e.g., by name)
    // return filteredStudents.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
  }

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
