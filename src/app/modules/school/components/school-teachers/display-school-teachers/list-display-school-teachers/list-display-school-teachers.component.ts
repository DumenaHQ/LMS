import { Component, Input, OnInit } from '@angular/core';
import { TeacherModel } from '../../models/teacher.model';

@Component({
  selector: 'app-list-display-school-teachers',
  templateUrl: './list-display-school-teachers.component.html',
  styleUrls: ['./list-display-school-teachers.component.scss']
})
export class ListDisplaySchoolTeachersComponent implements OnInit {

  @Input() teachers: TeacherModel[];
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  teacherName!: string;

  constructor() { }

  ngOnInit(): void {
  }

  // Open Confirm Delete Modal
  openDeleteModal(teacher: TeacherModel) {
    this.teacherName = teacher.fullname || '';
    this.deleteModal = true;
    this.deleteUrl = `users/teacher/${teacher.id}`;
    this.deleteRoutePath = '';
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

}
