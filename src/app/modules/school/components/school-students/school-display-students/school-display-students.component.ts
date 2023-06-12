import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  user: any;
  @Input() students: any;
  studentName: any

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
     // Get User data from localstorage
     let userData = this.authService.getUser();
     this.user = userData.user;
  }

   // Open Confirm Delete Modal
   openDeleteModal(student: any) {

    console.log(student);
    this.studentName = student.username
    
    this.deleteModal = true;

    this.deleteUrl = `schools/${this.user.id}/learners/${student.id}`
    this.deleteRoutePath = '/school/students'
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }
}
