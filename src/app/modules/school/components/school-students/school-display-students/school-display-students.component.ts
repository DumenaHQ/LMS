import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  @Input() students: any;
  @Input() user: any;
  studentName: any
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  
  constructor() {}

  ngOnInit(): void {
  }

   // Open Confirm Delete Modal
   openDeleteModal(student: any) {
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
