import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassroomModel } from './models/classroom.model';

@Component({
  selector: 'app-display-school-classrooms',
  templateUrl: './display-school-classrooms.component.html',
  styleUrls: ['./display-school-classrooms.component.scss']
})
export class DisplaySchoolClassroomsComponent implements OnInit {
  classrooms?: ClassroomModel[];
  dataLoading: boolean = true;

  constructor(
    private classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    // Get classrooms
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = (res.data.classes || []);

        console.log({
          title: 'classrooms',
          data: res.data.classes
        });
        
        // this.classrooms.forEach((p: any) => {
        //   // this.setTimeframe(p.start_date);
        // });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

}
