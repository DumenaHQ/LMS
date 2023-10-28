import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-display-learner-classooms',
  templateUrl: './display-learner-classooms.component.html',
  styleUrls: ['./display-learner-classooms.component.scss']
})
export class DisplayLearnerClassoomsComponent implements OnInit {

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
