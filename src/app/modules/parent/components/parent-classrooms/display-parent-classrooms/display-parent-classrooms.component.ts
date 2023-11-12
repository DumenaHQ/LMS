import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-display-parent-classrooms',
  templateUrl: './display-parent-classrooms.component.html',
  styleUrls: ['./display-parent-classrooms.component.scss']
})
export class DisplayParentClassroomsComponent implements OnInit {

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
          title: 'classrooms',
          data: res.data.classes
        });
        
        this.classrooms.forEach((p: any) => {
          // this.setTimeframe(p.start_date);
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }


}
