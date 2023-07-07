import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid-display-learner-classrooms',
  templateUrl: './grid-display-learner-classrooms.component.html',
  styleUrls: ['./grid-display-learner-classrooms.component.scss']
})
export class GridDisplayLearnerClassroomsComponent implements OnInit {

  @Input() classrooms: any;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display program
  displayClassroom(classroomId: string) {
    this.router.navigate([`/learner/classrooms/${classroomId}/view-classroom`]);
  }

}
