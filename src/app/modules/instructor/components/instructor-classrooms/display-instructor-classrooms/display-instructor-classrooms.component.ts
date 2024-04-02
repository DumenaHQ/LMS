import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-display-instructor-classrooms',
  templateUrl: './display-instructor-classrooms.component.html',
  styleUrls: ['./display-instructor-classrooms.component.scss']
})
export class DisplayInstructorClassroomsComponent implements OnInit {

  classrooms: any;
  dataLoading: boolean = true;

  constructor(
    private classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    // Get classrooms
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = res.data.classes;
        console.log({
          title: 'Classrooms',
          data: res.data.classes
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

}

