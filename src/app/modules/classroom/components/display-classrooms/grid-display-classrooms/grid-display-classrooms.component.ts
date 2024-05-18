import { Component, Input, OnInit } from '@angular/core';
import { ClassroomModel } from '../../../models/classroom.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-display-classrooms',
  templateUrl: './grid-display-classrooms.component.html',
  styleUrls: ['./grid-display-classrooms.component.scss']
})
export class GridDisplayClassroomsComponent implements OnInit {

  @Input() classrooms?: ClassroomModel[];
  classroomName: any;
  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display program
  displayClassroom(classroomId?: string) {
    this.router.navigate([`/school/classrooms/${classroomId}/view-classroom`]);
  }

  // Open Confirm Delete Modal
  openDeleteModal(classroom: any) {
    this.classroomName = classroom.name;
    this.deleteModal = true;
    this.deleteUrl = `classes/${classroom.id}`;
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

}
